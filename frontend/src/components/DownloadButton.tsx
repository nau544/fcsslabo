import React from "react";

type DownloadButtonProps = {
  onClick: () => void;
  label?: string;
  isDarkMode?: boolean;
};

const DownloadButton: React.FC<DownloadButtonProps> = ({
  onClick,
  label = "ダウンロード",
  isDarkMode = false
}) => (
  <button
    style={{
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "4px",
      padding: "8px 16px",
      marginRight: "8px",
      cursor: "pointer",
      fontSize: "1rem"
    }}
    onClick={onClick}
  >
    {label}
  </button>
);

export default DownloadButton;
