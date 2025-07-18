import React, { useState } from "react";
import UserManager from "./components/UserManager";
import SearchHistoryManager from "./components/SearchHistoryManager";
import "./App.css";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode'; // 太陽マークアイコンを追加
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu'; // ハンバーガーメニューアイコンを追加
import Drawer from '@mui/material/Drawer'; // ドロワーコンポーネントを追加
import List from '@mui/material/List'; // リストコンポーネントを追加
import ListItem from '@mui/material/ListItem'; // リストアイテムコンポーネントを追加
import ListItemText from '@mui/material/ListItemText'; // リストアイテムテキストコンポーネントを追加
import ListItemIcon from '@mui/material/ListItemIcon'; // リストアイテムアイコンコンポーネントを追加
import SettingsIcon from '@mui/icons-material/Settings'; // 設定アイコン
import InfoIcon from '@mui/icons-material/Info'; // 情報アイコン
import HomeIcon from '@mui/icons-material/Home'; // ホームアイコンを追加
import NotificationsIcon from '@mui/icons-material/Notifications'; // お知らせアイコンを追加
import Search from './components/Search';
import AddButton from "./components/AddButton";
import Grid from './components/Grid';
import DownloadButton from "./components/DownloadButton";
import UpdateIcon from '@mui/icons-material/Update';
import { UserWithMaster } from './types/UserWithMaster';


// カラム定義の型
type ColumnDefinition = {
    field: string;
    headerName: string;
    width: string;
    editable: boolean;
    type: string;
};

// userWithMasterColumnsをuseStateの前に宣言
const userWithMasterColumns: ColumnDefinition[] = [
    { field: 'id', headerName: 'ID', width: '8%', editable: false, type: 'number' },
    { field: 'username', headerName: 'ユーザー名', width: '18%', editable: true, type: 'text' },
    { field: 'email', headerName: 'メールアドレス', width: '24%', editable: true, type: 'email' },
    { field: 'genderName', headerName: '性別', width: '14%', editable: false, type: 'text' },
    { field: 'departmentName', headerName: '部署', width: '18%', editable: false, type: 'text' },
    { field: 'createdAt', headerName: '作成日時', width: '18%', editable: false, type: 'datetime' },
];

const App: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const [drawerOpen, setDrawerOpen] = React.useState(false); // ドロワーの開閉状態を管理
    const [showGrid, setShowGrid] = React.useState(false);
    const [refreshKey, setRefreshKey] = React.useState(0);
    const [searchResults, setSearchResults] = React.useState<UserWithMaster[]>([]); // 検索結果を管理
    const [tableColumns, setTableColumns] = React.useState<ColumnDefinition[]>([]); // テーブル構造を管理

    // 編集用state
    const [editTarget, setEditTarget] = useState<{ id: number; name: string; value: string } | null>(null);
    const [editName, setEditName] = useState("");
    const [editValue, setEditValue] = useState("");

    const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

    const handleCheckboxChange = (userId: number) => {
      setSelectedUserIds(prev =>
        prev.includes(userId)
          ? prev.filter(id => id !== userId)
          : [...prev, userId]
      );
    };

    const selectedUsers = searchResults.filter(user => selectedUserIds.includes(user.id));

    React.useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark');
            document.documentElement.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    // 初期化時にカラム定義をセット
    React.useEffect(() => {
        setTableColumns(userWithMasterColumns);
    }, []);

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
                await fetchAllUsers(); // ★追加：ユーザー追加後にグリッドを即時更新
            } else {
                alert("追加に失敗しました");
            }
        } catch (err) {
            alert("通信エラー");
        }
    };

    // 検索結果を受け取る関数
    const handleSearch = (results: UserWithMaster[]) => {
        // ID順にソートしてから設定
        const sortedResults = results.sort((a, b) => a.id - b.id);
        setSearchResults(sortedResults);
        setShowGrid(true);
    };

    // Grid用データに変換（ID順にソート済み）
    const gridData = searchResults.map(result => ({
        id: result.id,
        username: result.username,
        email: result.email,
        genderName: result.genderName,
        departmentName: result.departmentName,
        createdAt: result.createdAt
    }));

    // 編集ボタン押下時
    const handleEdit = (row: any) => {
        setEditTarget(row);
        setEditName(row.username);
        setEditValue(row.email);
    };

    // 削除ボタン押下時
    const handleDelete = async (row: any) => {
        // 削除確認ダイアログ
        if (!confirm(`ユーザー「${row.username}」を削除しますか？`)) {
            return;
        }

        try {
            const res = await fetch(`http://localhost:8081/api/users/${row.id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if (res.ok) {
                // 削除成功時は検索結果から該当ユーザーを削除（ID順を維持）
                setSearchResults(results =>
                    results.filter(r => r.id !== row.id).sort((a, b) => a.id - b.id)
                );
                alert("ユーザーを削除しました！");
            } else {
                alert("削除に失敗しました");
            }
        } catch (err) {
            alert("通信エラー");
        }
    };

    // 編集内容保存
    const handleEditSave = async () => {
        if (!editName.trim()) {
            alert("名前は必須です");
            return;
        }
        if (!editValue.trim()) {
            alert("メールアドレスは必須です");
            return;
        }
        // メールアドレス形式チェック
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editValue)) {
            alert("メールアドレスの形式が正しくありません");
            return;
        }

        if (!editTarget) return;

        try {
            const res = await fetch(`http://localhost:8081/api/users/${editTarget.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: editTarget.id,
                    username: editName,
                    email: editValue
                }),
            });

            if (res.ok) {
                // レスポンスのユーザー情報でstateを更新（ID順を維持）
                const updatedUser = await res.json();
                setSearchResults(results =>
                    results.map(r =>
                        r.id === updatedUser.id
                            ? { ...r, username: updatedUser.username, email: updatedUser.email }
                            : r
                    ).sort((a, b) => a.id - b.id)
                );
            } else {
                alert("更新に失敗しました");
            }
        } catch (err) {
            alert("通信エラー");
        }
        setEditTarget(null);
    };

    // 例: searchResultsをCSVでダウンロード
    const handleUserDownload = () => {
        if (!searchResults || searchResults.length === 0) {
            alert("ダウンロードできるユーザー情報がありません。");
            return;
        }
        // CSV変換
        const header = "ID,名前,メールアドレス\n";
        const rows = searchResults.map(u => `${u.id},"${u.name}","${u.email}"`).join("\n");
        const csv = header + rows;

        // Blobでダウンロード
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "ユーザー情報.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    // 全選択・全解除
    const handleCheckAll = () => {
      if (selectedUserIds.length === searchResults.length) {
        setSelectedUserIds([]); // 全解除
      } else {
        setSelectedUserIds(searchResults.map(user => user.id)); // 全選択
      }
    };

    // 全選択状態判定
    const isAllChecked = searchResults.length > 0 && selectedUserIds.length === searchResults.length;

    // テーブル構造を取得する関数
    const fetchTableStructure = async () => {
        try {
            const res = await fetch("http://localhost:8081/api/users/table-structure");
            if (res.ok) {
                const structure = await res.json();
                setTableColumns(structure.columns);
            }
        } catch (err) {
            console.error("テーブル構造の取得に失敗しました:", err);
        }
    };

    const fetchAllUsers = async () => {
      try {
        const res = await fetch("http://localhost:8081/api/users");
        if (res.ok) {
          const users = await res.json();
          // ID順にソート
          const sorted = users.sort((a: any, b: any) => a.id - b.id);
          setSearchResults(sorted);
          setShowGrid(true);
        }
      } catch (err) {
        alert("ユーザー一覧の取得に失敗しました");
      }
    };

    // ドロワーを開く関数
    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    // ドロワーを閉じる関数
    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    return (
        <div className={`App${isDarkMode ? ' dark' : ''}`}>
            <div className="red-banner" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                borderRadius: '0' // 上の丸みを消して角にする
            }}>
                <h1 style={{ margin: 0 }}>ユーザー情報管理ツール</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IconButton onClick={handleDrawerOpen}>
                        <MenuIcon />
                    </IconButton>
                    <IconButton onClick={() => setIsDarkMode((prev) => !prev)}>
                        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                </div>
            </div>

            {/* ドロワーメニュー */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerClose}
                PaperProps={{
                    style: {
                        width: '280px',
                        background: isDarkMode ? '#333' : '#fff',
                        color: isDarkMode ? '#fff' : '#222'
                    }
                }}
            >
                <div style={{ padding: '20px' }}>
                    <h2 style={{ 
                        margin: '0 0 20px 0',
                        color: isDarkMode ? '#fff' : '#222',
                        fontSize: '1.2rem'
                    }}>
                        メニュー
                    </h2>
                    <List>
                        <ListItem button onClick={() => {
                            // ホーム画面に戻る処理
                            setShowGrid(false);
                            setSearchResults([]);
                            handleDrawerClose();
                        }}>
                            <ListItemIcon>
                                <HomeIcon style={{ color: isDarkMode ? '#fff' : '#222' }} />
                            </ListItemIcon>
                            <ListItemText primary="ホーム" />
                        </ListItem>
                        <ListItem button onClick={() => {
                            alert('更新情報機能は開発中です');
                            handleDrawerClose();
                        }}>
                            <ListItemIcon>
                                <UpdateIcon style={{ color: isDarkMode ? '#fff' : '#222' }} />
                            </ListItemIcon>
                            <ListItemText primary="更新情報" />
                        </ListItem>
                        <ListItem button onClick={() => {
                            alert('設定機能は開発中です');
                            handleDrawerClose();
                        }}>
                            <ListItemIcon>
                                <SettingsIcon style={{ color: isDarkMode ? '#fff' : '#222' }} />
                            </ListItemIcon>
                            <ListItemText primary="設定" />
                        </ListItem>
                        <ListItem button onClick={() => {
                            alert('このアプリはユーザー情報管理ツールです');
                            handleDrawerClose();
                        }}>
                            <ListItemIcon>
                                <InfoIcon style={{ color: isDarkMode ? '#fff' : '#222' }} />
                            </ListItemIcon>
                            <ListItemText primary="アプリについて" />
                        </ListItem>
                    </List>
                </div>
            </Drawer>

            <div style={{ display: "flex", alignItems: "flex-start" }}>
                <div style={{ margin: "24px 0 0 24px", display: "flex", alignItems: "center", gap: "12px" }}>
                    <AddButton onUserAdd={handleUserAdd} isDarkMode={isDarkMode} />
                    <DownloadButton users={selectedUsers} />
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ margin: '24px 0', display: 'flex', justifyContent: 'center' }}>
                        <Search onSearch={handleSearch} isDarkMode={isDarkMode} />
                    </div>
                    <div className="content">
                        {/* 検索結果がある場合はGridを表示、ない場合はUserManagerを表示 */}
                        {showGrid && searchResults.length > 0 ? (
                            <div className="container">
                                <div className="box">
                                    <Grid
                                        data={gridData}
                                        columns={tableColumns}
                                        isDarkMode={isDarkMode}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                        selectedUserIds={selectedUserIds}
                                        onCheckboxChange={handleCheckboxChange}
                                        onCheckAll={handleCheckAll}         // 追加
                                        isAllChecked={isAllChecked}         // 追加
                                    />
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
                        background: isDarkMode ? "#333" : "white",
                        color: isDarkMode ? "#fff" : "#222",
                        padding: "32px", 
                        borderRadius: "8px", 
                        width: "600px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)", 
                        display: "flex", 
                        flexDirection: "column"
                    }}>
                        <h2 style={{ color: isDarkMode ? "#fff" : "#222" }}>編集</h2>
                        <label style={{ color: isDarkMode ? "#fff" : "#222" }}>
                            名前
                            <input
                                type="text"
                                value={editName}
                                onChange={e => setEditName(e.target.value)}
                                style={{ 
                                    width: "100%", 
                                    margin: "8px 0", 
                                    padding: "8px",
                                    background: isDarkMode ? "#444" : "#fff",
                                    color: isDarkMode ? "#fff" : "#222",
                                    border: isDarkMode ? "1px solid #555" : "1px solid #ddd",
                                    borderRadius: "4px"
                                }}
                            />
                        </label>
                        <label style={{ color: isDarkMode ? "#fff" : "#222" }}>
                            メールアドレス
                            <input
                                type="text"
                                value={editValue}
                                onChange={e => setEditValue(e.target.value)}
                                style={{ 
                                    width: "100%", 
                                    margin: "8px 0", 
                                    padding: "8px",
                                    background: isDarkMode ? "#444" : "#fff",
                                    color: isDarkMode ? "#fff" : "#222",
                                    border: isDarkMode ? "1px solid #555" : "1px solid #ddd",
                                    borderRadius: "4px"
                                }}
                            />
                        </label>
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "16px" }}>
                            <button 
                                onClick={() => setEditTarget(null)} 
                                style={{ 
                                    background: isDarkMode ? "#555" : "lightgray", 
                                    color: isDarkMode ? "#fff" : "#222",
                                    padding: "8px 16px",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer"
                                }}
                            >
                                キャンセル
                            </button>
                            <button 
                                onClick={handleEditSave} 
                                style={{ 
                                    background: "#b71c1c", 
                                    color: "white", 
                                    padding: "8px 16px",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer"
                                }}
                            >
                                保存
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;