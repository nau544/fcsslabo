import React, { useState, useEffect } from "react";
import Grid from "./Grid";

// ユーザー型
type User = {
    id: number;
    name: string;
    mailaddress: string;
};

type UserManagerProps = {
    isDarkMode: boolean;
};

const UserManager: React.FC<UserManagerProps> = ({ isDarkMode }) => {
    const [name, setName] = useState("");
    const [mailaddress, setMailaddress] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"success" | "error">("success");
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // 仮のユーザーデータ
    const dummyUsers = [
        { id: 1, name: '山田太郎', mailaddress: 'taro@example.com' },
        { id: 2, name: '佐藤花子', mailaddress: 'hanako@example.com' },
        { id: 3, name: '鈴木一郎', mailaddress: 'ichiro@example.com' },
    ];

    // ユーザー一覧取得
    const fetchUsers = async () => {
        try {
            const res = await fetch("http://localhost:8081/api/users");
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            } else {
                setMessage("ユーザー一覧の取得に失敗しました");
                setMessageType("error");
            }
        } catch (error) {
            setMessage("");
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
                body: JSON.stringify({ name, mailaddress }),
            });

            if (res.ok) {
                setMessage("ユーザーを追加しました！");
                setMessageType("success");
                setName("");
                setMailaddress("");
                fetchUsers(); // 一覧を更新
            } else {
                setMessage("ユーザーの追加に失敗しました");
                setMessageType("error");
            }
        } catch (error) {
            setMessage("");
            setMessageType("error");
        } finally {
            setIsLoading(false);
        }
    };

    // フォームをリセット
    const handleReset = () => {
        setName("");
        setMailaddress("");
        setMessage("");
    };

    // ユーザー一覧をGrid用データに変換
    const gridData = dummyUsers.map(user => ({
        id: user.id,
        name: user.name,
        value: user.mailaddress
    }));

    return (
        <div className="container">
            <div className="box">
                {/* ヘッダー */}
                <div className="header">
                    {/* ヘッダーの内容をここに追加 */}
                </div>

                {/* メッセージ表示 */}
                {message && (
                    <div className="message">
                        {message}
                    </div>
                )}

                {/* ユーザー一覧 */}
                <Grid data={gridData} isDarkMode={isDarkMode} />
            </div>
        </div>
    );
};

export default UserManager;

export { };
