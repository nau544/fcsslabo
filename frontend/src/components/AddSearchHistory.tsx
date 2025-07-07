import React, { useState } from "react";

const AddSearchHistory: React.FC = () => {
    const [keyword, setKeyword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        try {
            const res = await fetch("http://localhost:8082/api/search-history", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ keyword }),
            });
            if (res.ok) {
                setMessage("登録成功！");
                setKeyword("");
            } else {
                setMessage("登録失敗");
            }
        } catch (err) {
            setMessage("エラーが発生しました");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="キーワードを入力"
            />
            <button type="submit">登録</button>
            <div>{message}</div>
        </form>
    );
};

export default AddSearchHistory; 