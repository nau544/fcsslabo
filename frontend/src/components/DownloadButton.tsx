
import React from "react";
import * as XLSX from "xlsx";

type DownloadButtonProps = {
  users: { id: number; name: string; email: string }[];
};

const DownloadButton: React.FC<DownloadButtonProps> = ({ users }) => {
  const handleDownload = () => {
    if (!users || users.length === 0) {
      alert("ダウンロードするデータがありません");
      return;
    }
    try {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(users);
      XLSX.utils.book_append_sheet(workbook, worksheet, "ユーザー情報");
      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "ユーザー情報.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("エクセルダウンロードエラー:", error);
      alert("エクセルファイルの生成に失敗しました: " + error);
    }
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

