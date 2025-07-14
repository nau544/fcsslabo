
import React from "react";
import * as XLSX from "xlsx";

type DownloadButtonProps = {
  users: { id: number; name: string; email: string }[];
};

const DownloadButton: React.FC<DownloadButtonProps> = ({ users }) => {
  const handleDownload = async () => {
    console.log("ダウンロードボタンが押されました！");
    
    // 選択されたユーザーが0件の場合はアラートを表示
    if (users.length === 0) {
      alert("ダウンロードするユーザーを選択してください。");
      return;
    }
    
    // 選択されたユーザーIDのリストを作成
    const selectedUserIds = users.map(user => user.id);
    console.log("選択されたユーザーID:", selectedUserIds);
    
    try {
      // バックエンドAPIを呼び出して選択されたユーザーのみをダウンロード
      const response = await fetch("http://localhost:8081/api/download-selected-users-excel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedUserIds),
      });
      
      if (response.ok) {
        // レスポンスからBlobを作成
        const blob = await response.blob();
        
        // ダウンロードリンクを作成
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "selected_users.xlsx";
        
        // リンクをクリックしてダウンロード
        document.body.appendChild(link);
        link.click();
        
        // クリーンアップ
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        console.log(`${users.length}件のユーザー情報をダウンロードしました`);
      } else {
        console.error("ダウンロードに失敗しました:", response.status, response.statusText);
        alert("ダウンロードに失敗しました。");
      }
    } catch (error) {
      console.error("ダウンロードエラー:", error);
      alert("ダウンロード中にエラーが発生しました。");
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
      選択ユーザー情報ダウンロード ({users.length}件)
    </button>
  );
};

export default DownloadButton;

