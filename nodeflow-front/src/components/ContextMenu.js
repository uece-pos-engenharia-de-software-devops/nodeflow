import React from "react";

const ContextMenu = ({ x, y, onDelete }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: x,
        background: "white",
        border: "1px solid black",
        padding: "8px",
        zIndex: 10,
        boxShadow: "2px 2px 5px rgba(0,0,0,0.3)",
        borderRadius: "5px",
        minWidth: "130px",
        cursor: "pointer",
      }}
    >
      <div
        onClick={onDelete}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontWeight: "bold",
          padding: "8px",
          borderRadius: "5px",
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
