import React, { useState, useEffect, useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  applyNodeChanges,
  applyEdgeChanges
} from "reactflow";
import "reactflow/dist/style.css";
import axios from "axios";

const API_URL = "http://localhost:8080/api/nodes";

const GraphEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodeName, setNodeName] = useState("");

  // Buscar nós e relacionamentos do backend
  useEffect(() => {
    axios.get(`${API_URL}/with-relationships`)
      .then((response) => {
        const fetchedNodes = response.data.map((node) => ({
          id: String(node.node.id),
          data: { label: node.node.name },
          position: { x: node.node.x, y: node.node.y } // Usando a posição salva
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

  // Criar um novo nó
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

  // Remover um nó
  const removeNode = useCallback((nodeId) => {
    axios.delete(`${API_URL}/${nodeId}`)
      .then(() => {
        setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
        setEdges((prevEdges) => prevEdges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
      })
      .catch((error) => console.error("Erro ao excluir nó:", error));
  }, [setNodes, setEdges]);

  // Criar conexão entre nós
  const onConnect = useCallback((params) => {
    const { source, target } = params;
    axios.post(`${API_URL}/${source}/connect/${target}`)
      .then(() => {
        setEdges((prevEdges) => addEdge(params, prevEdges));
      })
      .catch((error) => console.error("Erro ao criar conexão:", error));
  }, []);

  // Deletar nós
  const onNodesDelete = useCallback((deletedNodes) => {
    deletedNodes.forEach((node) => {
      removeNode(node.id);
    });
  }, [removeNode]);

  // Deletar conexões
  const onEdgesDelete = useCallback((deletedEdges) => {
    deletedEdges.forEach((edge) => {
      axios.delete(`${API_URL}/${edge.source}/disconnect/${edge.target}`)
        .then(() => {
          setEdges((prevEdges) => prevEdges.filter((e) => e.id !== edge.id));
        })
        .catch((error) => console.error("Erro ao remover conexão:", error));
    });
  }, []);

  // Atualizar a posição ao mover um nó
  const onNodeDragStop = useCallback((event, node) => {
    axios.put(`${API_URL}/${node.id}`, {
      name: node.data.label,
      type: "Default",
      x: node.position.x,
      y: node.position.y
    }).catch((error) => console.error("Erro ao atualizar posição:", error));
  }, []);

  return (
    <div style={{ height: "100vh", padding: "10px" }}>
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
        onNodesDelete={onNodesDelete}
        onEdgesDelete={onEdgesDelete}
        onNodeDragStop={onNodeDragStop} // Atualiza a posição do nó ao soltar o mouse
        deleteKeyCode={46}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default GraphEditor;
