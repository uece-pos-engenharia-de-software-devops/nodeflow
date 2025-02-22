import React from "react";

const ContextMenu = ({ x, y, onDelete, onEdit, closeMenu }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: x,
        background: "white",
        border: "1px solid black",
        padding: "8px",
        zIndex: 1000,
        boxShadow: "2px 2px 5px rgba(0,0,0,0.3)",
        borderRadius: "5px",
        minWidth: "150px",
        cursor: "pointer",
      }}
    >
      <div
        onClick={() => {
          onEdit();
          closeMenu(); // Fecha o menu de contexto ao clicar em editar
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "8px",
          borderRadius: "5px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => (e.target.style.background = "#f5f5f5")}
        onMouseLeave={(e) => (e.target.style.background = "white")}
      >
        ✏️ Editar Nó
      </div>
      <div
        onClick={() => {
          onDelete();
          closeMenu(); // Fecha o menu de contexto ao deletar
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "8px",
          borderRadius: "5px",
          fontWeight: "bold",
          cursor: "pointer",
          color: "#d32f2f",
        }}
        onMouseEnter={(e) => (e.target.style.background = "#f5f5f5")}
        onMouseLeave={(e) => (e.target.style.background = "white")}
      >
        🗑️ Remover Nó
      </div>
    </div>
  );
};

export default ContextMenu;
