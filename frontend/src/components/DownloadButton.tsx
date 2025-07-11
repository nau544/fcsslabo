
import React from "react";
import * as XLSX from "xlsx";

type DownloadButtonProps = {
  users: { id: number; name: string; email: string }[];
};

const DownloadButton: React.FC<DownloadButtonProps> = ({ users }) => {
  const handleDownload = () => {
    console.log("ダウンロードボタンが押されました！");
    // ここに実際のダウンロード処理を追加
    window.location.href = "http://localhost:8081/api/download-user-excel";
  };

  return (
    <button
      style={{
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "4px",
        padding: "8px 16px",
        marginRight: "8px",
        cursor: "pointer",
        fontSize: "1rem",
      }}
      onClick={handleDownload}
    >
      ユーザー情報ダウンロード
    </button>
  );
};

export default DownloadButton;

