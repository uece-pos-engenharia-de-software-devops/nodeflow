import React from "react";

const ContextMenu = ({ x, y, onDelete, onEdit, closeMenu, isEdge = false }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: x,
        background: "#1E1E1E",
        border: "1px solid #4CAF50",
        padding: "8px",
        zIndex: 1000,
        boxShadow: "2px 2px 5px rgba(0,0,0,0.3)",
        borderRadius: "5px",
        minWidth: "150px",
        color: "#FFF",
      }}
    >
      {!isEdge && (
        <div
          onClick={onEdit}
          style={{
            padding: "8px",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
            backgroundColor: "#4CAF50",
            color: "#FFF",
            textAlign: "center",
          }}
        >
          ✏️ Editar Nó
        </div>
      )}
      <div
        onClick={onDelete}
        style={{
          padding: "8px",
          borderRadius: "5px",
          fontWeight: "bold",
          cursor: "pointer",
          backgroundColor: "#D32F2F",
          color: "#FFF",
          textAlign: "center",
          marginTop: "5px",
        }}
      >
        {isEdge ? "🔗 Remover Relacionamento" : "🗑️ Remover Nó"}
      </div>
    </div>
  );
};

export default ContextMenu;
