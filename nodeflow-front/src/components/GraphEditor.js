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
  const [nodeName, setNodeName] = useState("");
  const [contextMenu, setContextMenu] = useState(null);
  const [editingNode, setEditingNode] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/with-relationships`)
      .then((response) => {
        const fetchedNodes = response.data.map((node) => ({
          id: String(node.node.id),
          data: { label: node.node.name },
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

  const addNode = () => {
    if (!nodeName.trim()) return;

    const newNode = {
      name: nodeName,
      type: "Default",
      x: Math.random() * 400,
      y: Math.random() * 400
    };

    axios.post(API_URL, newNode)
      .then((response) => {
        setNodes((prevNodes) => [
          ...prevNodes,
          {
            id: String(response.data.id),
            data: { label: response.data.name },
            position: { x: response.data.x, y: response.data.y }
          }
        ]);
        setNodeName("");
      })
      .catch((error) => console.error("Erro ao criar nó:", error));
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

  const onConnect = useCallback((params) => {
    const { source, target } = params;
    axios.post(`${API_URL}/${source}/connect/${target}`)
      .then(() => {
        setEdges((prevEdges) => addEdge(params, prevEdges));
      })
      .catch((error) => console.error("Erro ao criar conexão:", error));
  }, []);

  const removeEdge = useCallback((edgeId, source, target) => {
    axios.delete(`${API_URL}/${source}/disconnect/${target}`)
      .then(() => {
        setEdges((prevEdges) => prevEdges.filter((e) => e.id !== edgeId));
        setContextMenu(null);
      })
      .catch((error) => console.error("Erro ao remover conexão:", error));
  }, []);

  const onEdgesDelete = useCallback((deletedEdges) => {
    deletedEdges.forEach((edge) => {
      removeEdge(edge.id, edge.source, edge.target);
    });
  }, [removeEdge]);

  const onNodeDragStop = useCallback((event, node) => {
    axios.put(`${API_URL}/${node.id}`, {
      name: node.data.label,
      type: "Default",
      x: node.position.x,
      y: node.position.y
    }).catch((error) => console.error("Erro ao atualizar posição:", error));
  }, []);

  const openEditModal = (nodeId, nodeName) => {
    setEditingNode({ nodeId, nodeName });
    setContextMenu(null);
  };

  const editNode = (nodeId, newName) => {
    axios.put(`${API_URL}/${nodeId}`, {
      name: newName,
      type: "Default",
      x: nodes.find((n) => n.id === nodeId).position.x,
      y: nodes.find((n) => n.id === nodeId).position.y,
    })
      .then(() => {
        setNodes((prevNodes) =>
          prevNodes.map((node) =>
            node.id === nodeId ? { ...node, data: { label: newName } } : node
          )
        );
        setEditingNode(null);
      })
      .catch((error) => console.error("Erro ao editar nó:", error));
  };

  const onNodeContextMenu = useCallback((event, node) => {
    event.preventDefault();
    setContextMenu({
      type: "node",
      mouseX: event.clientX,
      mouseY: event.clientY,
      nodeId: node.id,
      nodeName: node.data.label,
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
      target: edge.target,
    });
  }, []);

  return (
    <div style={{ height: "100vh", padding: "10px" }} onClick={() => setContextMenu(null)}>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Nome do Nó"
          value={nodeName}
          onChange={(e) => setNodeName(e.target.value)}
        />
        <button onClick={addNode}>Adicionar Nó</button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgesDelete={onEdgesDelete}
        onNodeDragStop={onNodeDragStop}
        onNodeContextMenu={onNodeContextMenu}
        onEdgeContextMenu={onEdgeContextMenu}
        deleteKeyCode={46}
      >
        <Controls />
        <Background />
      </ReactFlow>

      {contextMenu && contextMenu.type === "node" && (
        <ContextMenu
          x={contextMenu.mouseX}
          y={contextMenu.mouseY}
          onDelete={() => removeNode(contextMenu.nodeId)}
          onEdit={() => openEditModal(contextMenu.nodeId, contextMenu.nodeName)}
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
          onClose={() => setEditingNode(null)}
          onSave={editNode}
        />
      )}
    </div>
  );
};

export default GraphEditor;
