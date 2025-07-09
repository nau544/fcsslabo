import React from "react";
import UserManager from "./components/UserManager";
import SearchHistoryManager from "./components/SearchHistoryManager";
import "./App.css";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import IconButton from '@mui/material/IconButton';
import Search from './components/Search';
import AddButton from "./components/AddButton";

const App: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const [showGrid, setShowGrid] = React.useState(false);
    

    React.useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark');
            document.documentElement.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    // ユーザー追加API
    const handleUserAdd = async (user: { name: string; email: string }) => {
        try {
            const res = await fetch("http://localhost:8081/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });
            if (res.ok) {
                alert("ユーザーを追加しました！");
                // 必要なら一覧の再取得など
            } else {
                alert("追加に失敗しました");
            }
        } catch (err) {
            alert("通信エラー");
        }
    };

    return (
        <div className={`App${isDarkMode ? ' dark' : ''}`}>
            <div className="red-banner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h1 style={{ margin: 0 }}>契約書</h1>
                <IconButton onClick={() => setIsDarkMode((prev) => !prev)}>
                    <DarkModeIcon />
                </IconButton>
            </div>

            {/* ここで赤い帯の下、左端に追加ボタンを配置 */}
            <div style={{ display: "flex", alignItems: "flex-start" }}>
                <div style={{ margin: "24px 0 0 24px" }}>
                    <AddButton onUserAdd={handleUserAdd} />
                </div>
                {/* 右側に既存の検索やコンテンツ */}
                <div style={{ flex: 1 }}>
                    <div style={{ margin: '24px 0', display: 'flex', justifyContent: 'center' }}>
                        <Search onSearch={() => setShowGrid(true)} />
                    </div>
                    <div className="content">
                        {showGrid && <UserManager isDarkMode={isDarkMode} />}
                        <SearchHistoryManager />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;