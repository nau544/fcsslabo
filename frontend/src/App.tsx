import React, { useState } from "react";
import UserManager from "./components/UserManager";
import SearchHistoryManager from "./components/SearchHistoryManager";
import "./App.css";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import IconButton from '@mui/material/IconButton';
import Search from './components/Search';
import AddButton from "./components/AddButton";
import Grid from './components/Grid';

// 検索結果の型定義
type SearchResult = {
    id: number;
    name: string;
    email: string;
};

const App: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const [showGrid, setShowGrid] = React.useState(false);
    const [refreshKey, setRefreshKey] = React.useState(0);
    const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]); // 検索結果を管理

    // 編集用state
    const [editTarget, setEditTarget] = useState<{ id: number; name: string; value: string } | null>(null);
    const [editName, setEditName] = useState("");
    const [editValue, setEditValue] = useState("");

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
                setRefreshKey(prev => prev + 1);
            } else {
                alert("追加に失敗しました");
            }
        } catch (err) {
            alert("通信エラー");
        }
    };

    // 検索結果を受け取る関数
    const handleSearch = (results: SearchResult[]) => {
        setSearchResults(results);
        setShowGrid(true);
    };

    // Grid用データに変換
    const gridData = searchResults.map(result => ({
        id: result.id,
        name: result.name,
        value: result.email
    }));

    // 編集ボタン押下時
    const handleEdit = (row: { id: number; name: string; value: string }) => {
        setEditTarget(row);
        setEditName(row.name);
        setEditValue(row.value);
    };

    // 編集内容保存
    const handleEditSave = () => {
        // ここでAPI呼び出しやstate更新を行う
        // 例: setSearchResults(results => results.map(r => r.id === editTarget.id ? { ...r, name: editName, value: editValue } : r));
        setEditTarget(null);
    };

    return (
        <div className={`App${isDarkMode ? ' dark' : ''}`}>
            <div className="red-banner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h1 style={{ margin: 0 }}>契約書</h1>
                <IconButton onClick={() => setIsDarkMode((prev) => !prev)}>
                    <DarkModeIcon />
                </IconButton>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start" }}>
                <div style={{ margin: "24px 0 0 24px" }}>
                    <AddButton onUserAdd={handleUserAdd} />
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ margin: '24px 0', display: 'flex', justifyContent: 'center' }}>
                        <Search onSearch={handleSearch} />
                    </div>
                    <div className="content">
                        {/* 検索結果がある場合はGridを表示、ない場合はUserManagerを表示 */}
                        {showGrid && searchResults.length > 0 ? (
                            <div className="container">
                                <div className="box">
                                    <div className="header">
                                        <h2>検索結果</h2>
                                        <p>検索結果: {searchResults.length}件</p>
                                    </div>
                                    <Grid
                                        data={gridData}
                                        isDarkMode={isDarkMode}
                                        onEdit={handleEdit}
                                    />
                                </div>
                            </div>
                        ) : showGrid ? (
                            <div className="container">
                                <div className="box">
                                    <div className="header">
                                        <h2>検索結果</h2>
                                        <p>該当するユーザーが見つかりませんでした</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <UserManager key={refreshKey} isDarkMode={isDarkMode} />
                        )}
                        <SearchHistoryManager />
                    </div>
                </div>
            </div>

            {/* 編集モーダル */}
            {editTarget && (
                <div style={{
                    position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
                    background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000
                }}>
                    <div style={{
                        background: "white", padding: "32px", borderRadius: "8px", width: "400px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)", display: "flex", flexDirection: "column"
                    }}>
                        <h2>編集</h2>
                        <label>
                            名前
                            <input
                                type="text"
                                value={editName}
                                onChange={e => setEditName(e.target.value)}
                                style={{ width: "100%", margin: "8px 0", padding: "8px" }}
                            />
                        </label>
                        <label>
                            メールアドレス
                            <input
                                type="text"
                                value={editValue}
                                onChange={e => setEditValue(e.target.value)}
                                style={{ width: "100%", margin: "8px 0", padding: "8px" }}
                            />
                        </label>
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "16px" }}>
                            <button onClick={() => setEditTarget(null)} style={{ background: "lightgray", padding: "8px 16px" }}>キャンセル</button>
                            <button onClick={handleEditSave} style={{ background: "#b71c1c", color: "white", padding: "8px 16px" }}>保存</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;