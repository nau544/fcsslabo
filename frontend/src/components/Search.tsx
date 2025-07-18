import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search'; // Material-UIの検索アイコンを追加
import { UserWithMaster } from '../types/UserWithMaster';

// 検索結果の型定義
// type SearchResult = {
//     id: number;
//     name: string;
//     username: string;
//     email: string;
// };

type SearchProps = {
    onSearch: (results: UserWithMaster[]) => void; // 検索結果を親に渡す
    isDarkMode?: boolean; // ダークモード用プロパティを追加
};

const Search: React.FC<SearchProps> = ({ onSearch, isDarkMode = false }) => {
    const [keyword, setKeyword] = useState('');

    // 検索処理を実行する関数
    const handleSearch = async () => {
        try {
            let url = 'http://localhost:8081/api/users/with-master';
            
            // キーワードが入力されている場合は検索APIを呼び出し
            if (keyword.trim()) {
                url += `?keyword=${encodeURIComponent(keyword.trim())}`;
            }
            
            console.log('検索URL:', url); // デバッグ用
            
            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                console.log('検索結果:', data); // デバッグ用
                onSearch(data);
            } else {
                console.error('検索に失敗しました:', res.status, res.statusText);
            }
        } catch (error) {
            console.error('検索に失敗しました:', error);
        }
    };

    // フォーム送信時の処理
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSearch();
    };

    // クリアボタンの処理
    const handleClear = () => {
        setKeyword('');
        // 空欄の場合は全件取得
        handleSearch();
    };

    // 入力値変更時の処理
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    // 検索ボタンクリック時の処理
    const handleSearchClick = () => {
        handleSearch();
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <input
                type="text"
                value={keyword}
                onChange={handleInputChange}
                placeholder="ID、名前、またはメールアドレスで検索"
                style={{
                    width: '400px',
                    height: '40px',
                    fontSize: '1.2rem',
                    border: isDarkMode ? '1px solid #555' : '1px solid #ccc',
                    borderRadius: '4px 0 0 4px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    background: isDarkMode ? '#444' : '#fff',
                    color: isDarkMode ? '#fff' : '#222',
                    padding: '0 12px'
                }}
            />
            <button
                type="submit"
                style={{
                    backgroundColor: '#b71c1c',
                    color: 'white',
                    border: 'none',
                    height: '40px',
                    padding: '0 20px',
                    borderRadius: '0 4px 4px 0',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                }}
            >
                <SearchIcon style={{ fontSize: '1.2rem' }} />
                検索
            </button>
            <button
                type="button"
                onClick={handleClear}
                style={{
                    marginLeft: '10px',
                    backgroundColor: isDarkMode ? '#555' : 'lightgray',
                    color: isDarkMode ? '#fff' : '#222',
                    border: 'none',
                    height: '40px',
                    padding: '0 20px',
                    borderRadius: '4px',
                    fontSize: '1.2rem',
                    cursor: 'pointer'
                }}
            >
                × クリア
            </button>
        </form>
    );
};

export default Search;

