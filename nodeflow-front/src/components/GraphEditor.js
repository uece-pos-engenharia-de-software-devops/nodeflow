import React, { useState, useEffect, useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState
} from "reactflow";
import "reactflow/dist/style.css";
import axios from "axios";
import ContextMenu from "./ContextMenu";
import EditNodeModal from "./EditNodeModal";

const API_URL = "http://localhost:8080/api/nodes";

const GraphEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [contextMenu, setContextMenu] = useState(null);
  const [editingNode, setEditingNode] = useState(null);
  const [creatingNode, setCreatingNode] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    axios.get(`${API_URL}/with-relationships`)
      .then((response) => {
        const fetchedNodes = response.data.map((node) => ({
          id: String(node.node.id),
          data: { label: node.node.name, type: node.node.type },
          position: { x: node.node.x, y: node.node.y }
        }));

        setNodes(fetchedNodes);

        const fetchedEdges = response.data.flatMap((node) =>
          node.relatedNodeIds.map((relatedId) => ({
            id: `edge-${node.node.id}-${relatedId}`,
            source: String(node.node.id),
            target: String(relatedId),
            animated: true
          }))
        );

        setEdges(fetchedEdges);
      })
      .catch((error) => console.error("Erro ao buscar nós e relações:", error));
  }, []);

  const addNode = (name, type) => {
    if (!name || !name.trim()) {
      console.error("Erro: Nome do nó está vazio ou inválido.");
      return;
    }

    const nodeType = type || "Default";

    const newNode = {
      name: name.trim(),
      type: nodeType,
      x: Math.random() * 400,
      y: Math.random() * 400
    };

    axios.post(API_URL, newNode)
      .then((response) => {
        setNodes((prevNodes) => [
          ...prevNodes,
          {
            id: String(response.data.id),
            data: { label: response.data.name, type: response.data.type },
            position: { x: response.data.x, y: response.data.y }
          }
        ]);
        setCreatingNode(false);
      })
      .catch((error) => console.error("Erro ao criar nó:", error));
  };

  const editNode = (nodeId, newName, newType) => {
    axios.put(`${API_URL}/${nodeId}`, {
      name: newName,
      type: newType,
      x: nodes.find((n) => n.id === nodeId).position.x,
      y: nodes.find((n) => n.id === nodeId).position.y
    })
      .then(() => {
        setNodes((prevNodes) =>
          prevNodes.map((node) =>
            node.id === nodeId ? { ...node, data: { label: newName, type: newType } } : node
          )
        );
        setEditingNode(null);
      })
      .catch((error) => console.error("Erro ao editar nó:", error));
  };

  const removeNode = (nodeId) => {
    axios.delete(`${API_URL}/${nodeId}`)
      .then(() => {
        setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
        setEdges((prevEdges) => prevEdges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
        setContextMenu(null);
      })
      .catch((error) => console.error("Erro ao excluir nó:", error));
  };

  const removeEdge = useCallback((edgeId, source, target) => {
    axios.delete(`${API_URL}/${source}/disconnect/${target}`)
      .then(() => {
        setEdges((prevEdges) => prevEdges.filter((e) => e.id !== edgeId));
        setContextMenu(null);
      })
      .catch((error) => console.error("Erro ao remover conexão:", error));
  }, []);

  const onNodeContextMenu = useCallback((event, node) => {
    event.preventDefault();
    setContextMenu({
      type: "node",
      mouseX: event.clientX,
      mouseY: event.clientY,
      nodeId: node.id,
      nodeName: node.data.label,
      nodeType: node.data.type
    });
  }, []);

  const onEdgeContextMenu = useCallback((event, edge) => {
    event.preventDefault();
    setContextMenu({
      type: "edge",
      mouseX: event.clientX,
      mouseY: event.clientY,
      edgeId: edge.id,
      source: edge.source,
      target: edge.target
    });
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "white" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div style={{ 
      height: "100vh", 
      backgroundColor: theme === "dark" ? "#121212" : "#FFFFFF",
      color: theme === "dark" ? "#FFFFFF" : "#000000",
      padding: "10px"
    }}>
      <button onClick={() => setCreatingNode(true)}>Adicionar Nó</button>
      <button onClick={toggleTheme} style={{ marginLeft: "10px" }}>
        Alternar para {theme === "dark" ? "White" : "Dark"} Mode
      </button>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={(params) => axios.post(`${API_URL}/${params.source}/connect/${params.target}`)
          .then(() => setEdges((prevEdges) => addEdge(params, prevEdges)))
          .catch((error) => console.error("Erro ao criar conexão:", error))
        }
        onNodeContextMenu={onNodeContextMenu}
        onEdgeContextMenu={onEdgeContextMenu}
        deleteKeyCode={46}
      >
        <Controls />
        <Background color={theme === "dark" ? "#333" : "#E0E0E0"} gap={16} />
      </ReactFlow>

      {contextMenu && contextMenu.type === "node" && (
        <ContextMenu
          x={contextMenu.mouseX}
          y={contextMenu.mouseY}
          onDelete={() => removeNode(contextMenu.nodeId)}
          onEdit={() => setEditingNode({
            nodeId: contextMenu.nodeId, 
            nodeName: contextMenu.nodeName, 
            nodeType: contextMenu.nodeType 
          })}
          closeMenu={() => setContextMenu(null)}
        />
      )}

      {contextMenu && contextMenu.type === "edge" && (
        <ContextMenu
          x={contextMenu.mouseX}
          y={contextMenu.mouseY}
          onDelete={() => removeEdge(contextMenu.edgeId, contextMenu.source, contextMenu.target)}
          closeMenu={() => setContextMenu(null)}
          isEdge
        />
      )}

      {editingNode && (
        <EditNodeModal
          nodeId={editingNode.nodeId}
          nodeName={editingNode.nodeName}
          nodeType={editingNode.nodeType}
          onClose={() => setEditingNode(null)}
          onSave={editNode}
          theme={theme}
        />
      )}

      {creatingNode && (
        <EditNodeModal
          nodeId={null}
          nodeName=""
          nodeType="Default"
          onClose={() => setCreatingNode(false)}
          onSave={addNode}
          isNewNode
          theme={theme}
        />
      )}
    </div>
  );
};

export default GraphEditor;
