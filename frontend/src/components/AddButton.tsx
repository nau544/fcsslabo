import React from "react";

type AddButtonProps = {
  onClick: () => void;
};

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => (
  <button
    style={{
      backgroundColor: "#b71c1c",
      color: "white",
      border: "none",
      borderRadius: "4px",
      padding: "8px 16px",
      marginRight: "8px",
      cursor: "pointer"
    }}
    onClick={onClick}
  >
    ユーザー追加
  </button>
);

export default AddButton;
