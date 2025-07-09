import React, { useState } from "react";

type AddButtonProps = {
  onUserAdd?: (user: { name: string; email: string }) => void;
};

const AddButton: React.FC<AddButtonProps> = ({ onUserAdd }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setName("");
    setEmail("");
    setError(null);
  };

  // メールアドレスの簡易バリデーション
  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSave = () => {
    if (!name.trim()) {
      setError("ユーザー名を入力してください。");
      return;
    }
    if (!email.trim()) {
      setError("メールアドレスを入力してください。");
      return;
    }
    if (!isValidEmail(email)) {
      setError("正しいメールアドレス形式で入力してください。");
      return;
    }
    setError(null);
    if (onUserAdd) {
      onUserAdd({ name, email });
    }
    handleClose();
  };

  return (
    <>
      <button
        style={{
          backgroundColor: "#d32f2f",
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "8px 16px",
          marginRight: "8px",
          cursor: "pointer"
        }}
        onClick={handleOpen}
      >
        ユーザー追加
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000
          }}
        >
          <div
            style={{
              background: "white",
              padding: "32px",
              borderRadius: "8px",
              width: "600px", // ← ここを追加・修正
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch"
            }}
          >
            <h2 style={{ marginBottom: "16px" }}>ユーザー追加</h2>
            <label style={{ marginBottom: "8px" }}>
              ユーザー名
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{ width: "100%", marginTop: "4px", marginBottom: "12px", padding: "8px" }}
                placeholder="ユーザー名を入力してください" // ← ここを追加
              />
            </label>
            <label style={{ marginBottom: "16px" }}>
              メールアドレス
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: "100%", marginTop: "4px", marginBottom: "12px", padding: "8px" }}
                placeholder="メールアドレスを入力してください" // ← ここを追加
              />
            </label>
            {/* エラーメッセージ表示 */}
            {error && (
              <div style={{ color: "red", marginBottom: "12px" }}>{error}</div>
            )}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <button
                onClick={handleClose}
                style={{
                  background: "lightgray",
                  color: "black",
                  border: "none",
                  borderRadius: "4px",
                  padding: "8px 16px",
                  cursor: "pointer"
                }}
              >
                キャンセル
              </button>
              <button
                onClick={handleSave}
                style={{
                  background: "#b71c1c",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "8px 16px",
                  cursor: "pointer"
                }}
                // 入力が空欄のときはボタンを無効化
                disabled={!name || !email}
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddButton;
