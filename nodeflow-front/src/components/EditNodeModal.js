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
        borderRadius: "10px",
        boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
        zIndex: 1000
      }}
    >
      <h3>{isNewNode ? "Criar Novo Nó" : `Editar Nó (ID: ${nodeId})`}</h3>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <br />
      <button onClick={() => onSave(isNewNode ? newName : nodeId, newName)}>Salvar</button>
      <button onClick={onClose} style={{ marginLeft: "10px" }}>Cancelar</button>
    </div>
  );
};

export default EditNodeModal;
