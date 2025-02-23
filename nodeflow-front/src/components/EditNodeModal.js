import React, { useState } from "react";

const EditNodeModal = ({ nodeId, nodeName, onClose, onSave, isNewNode = false }) => {
  const [newName, setNewName] = useState(nodeName);

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
        zIndex: 1000,
        minWidth: "300px",
        textAlign: "center"
      }}
    >
      <h3 style={{ marginBottom: "10px", fontWeight: "bold", color: "#333" }}>
        {isNewNode ? "Criar Novo Nó" : `Editar Nó (ID: ${nodeId})`}
      </h3>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px"
        }}
      />
      <br />
      <button 
        onClick={() => onSave(isNewNode ? newName : nodeId, newName)}
        style={{
          marginTop: "15px",
          background: "#28a745",
          color: "white",
          padding: "10px 16px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          transition: "0.3s"
        }}
        onMouseEnter={(e) => e.target.style.background = "#218838"}
        onMouseLeave={(e) => e.target.style.background = "#28a745"}
      >
        ✅ Salvar
      </button>
      <button 
        onClick={onClose}
        style={{
          marginTop: "15px",
          marginLeft: "10px",
          background: "#dc3545",
          color: "white",
          padding: "10px 16px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          transition: "0.3s"
        }}
        onMouseEnter={(e) => e.target.style.background = "#c82333"}
        onMouseLeave={(e) => e.target.style.background = "#dc3545"}
      >
        ❌ Cancelar
      </button>
    </div>
  );
};

export default EditNodeModal;
