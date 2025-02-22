import React from "react";

const ContextMenu = ({ x, y, onDelete, onEdit, closeMenu, isEdge = false }) => {
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
      {!isEdge && <div onClick={onEdit}>✏️ Editar Nó</div>}
      <div onClick={onDelete}>{isEdge ? "🔗 Remover Relacionamento" : "🗑️ Remover Nó"}</div>
    </div>
  );
};

export default ContextMenu;
