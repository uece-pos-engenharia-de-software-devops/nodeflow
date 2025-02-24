import React, { useState } from "react";

const NODE_TYPES = ["Default", "TypeA", "TypeB", "TypeC"];

const EditNodeModal = ({ nodeId, nodeName, nodeType, onClose, onSave, isNewNode = false, theme }) => {
  const [newName, setNewName] = useState(nodeName || "");
  const [selectedType, setSelectedType] = useState(nodeType || "Default");

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: theme === "dark" ? "#1E1E1E" : "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
        zIndex: 1000,
        color: theme === "dark" ? "#FFFFFF" : "#000000",
        minWidth: "300px"
      }}
    >
      <h3>{isNewNode ? "Criar Novo Nó" : `Editar Nó (ID: ${nodeId})`}</h3>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #4CAF50",
          backgroundColor: theme === "dark" ? "#121212" : "#F0F0F0",
          color: theme === "dark" ? "#FFFFFF" : "#000000"
        }}
      />
      
      <label>Tipo:</label>
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          borderRadius: "5px",
          backgroundColor: theme === "dark" ? "#121212" : "#F0F0F0",
          color: theme === "dark" ? "#FFFFFF" : "#000000"
        }}
      >
        {NODE_TYPES.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      <button onClick={() => onSave(newName, selectedType)}>Salvar</button>
      <button onClick={onClose} style={{ marginLeft: "10px" }}>Cancelar</button>
    </div>
  );
};

export default EditNodeModal;
