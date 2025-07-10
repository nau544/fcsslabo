import React, { useState, useEffect } from "react";
import Grid from "./Grid";

// ユーザー型（DBの構造に合わせて修正）
type User = {
    id: number;
    name: string;
    email: string; // mailaddressからemailに変更
};

type UserManagerProps = {
    isDarkMode: boolean;
};

const UserManager: React.FC<UserManagerProps> = ({ isDarkMode }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState(""); // mailaddressからemailに変更
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"success" | "error">("success");
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // ユーザー一覧取得
    const fetchUsers = async () => {
        try {
            console.log("ユーザー一覧を取得中..."); // デバッグログ追加
            const res = await fetch("http://localhost:8081/api/users");
            if (res.ok) {
                const data = await res.json();
                console.log("取得したユーザーデータ:", data); // デバッグログ追加
                setUsers(data);
            } else {
                console.error("ユーザー一覧取得失敗:", res.status, res.statusText); // エラーログ追加
                setMessage("ユーザー一覧の取得に失敗しました");
                setMessageType("error");
            }
        } catch (error) {
            console.error("ユーザー一覧取得エラー:", error); // エラーログ追加
            setMessage("ユーザー一覧の取得に失敗しました");
            setMessageType("error");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // ユーザー追加処理
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");

        try {
            const res = await fetch("http://localhost:8081/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email }), // mailaddressからemailに変更
            });

            if (res.ok) {
                setMessage("ユーザーを追加しました！");
                setMessageType("success");
                setName("");
                setEmail(""); // mailaddressからemailに変更
                fetchUsers(); // 一覧を更新
            } else {
                setMessage("ユーザーの追加に失敗しました");
                setMessageType("error");
            }
        } catch (error) {
            setMessage("ユーザーの追加に失敗しました");
            setMessageType("error");
        } finally {
            setIsLoading(false);
        }
    };

    // フォームをリセット
    const handleReset = () => {
        setName("");
        setEmail(""); // mailaddressからemailに変更
        setMessage("");
    };

    // ユーザー一覧をGrid用データに変換（実際のDBデータを使用）
    const gridData = users.map(user => ({
        id: user.id,
        name: user.name,
        value: user.email // mailaddressからemailに変更
    }));

    return (
        <div
            style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 3000,
                background: isDarkMode ? "#222" : "white",
                color: isDarkMode ? "#fff" : "#222",
                padding: "32px 48px",
                borderRadius: "12px",
                boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
                textAlign: "center"
            }}
        >
            <h2 style={{ margin: "0 0 16px 0" }}>ユーザー管理</h2>
            <div style={{ marginBottom: "8px" }}>登録済みユーザー数: {users.length}件</div>
            <div style={{ color: "red" }}>
                ユーザー一覧の取得に失敗しました
            </div>
        </div>
    );
};

export default UserManager;
