import React, { useState } from 'react';

type Result = {
    id: number;
    name: string;
    details: string;
};

type SearchProps = {
    onSearch: (query: string) => void;
};

const Search: React.FC<SearchProps> = ({ onSearch }) => {
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState<Result[]>([]);

    const handleSearch = async () => {
        if (!keyword) return;
        try {
            // 1. 検索履歴を保存
            await saveSearchHistory(keyword);

            // 2. 実際の検索処理（既存のロジック）
            const res = await fetch(`http://localhost:8080/api/search?keyword=${keyword}`);
            const data = await res.json();
            setResults(data);
        } catch (error) {
            console.error('検索に失敗しました:', error);
        }
    };

    const handleClear = () => {
        setKeyword('');
        setResults([]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(keyword);
    };

    // 検索キーワードを保存するAPI呼び出し関数
    const saveSearchHistory = async (keyword: string) => {
        await fetch('http://localhost:8080/api/search-history', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(keyword),
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    const handleSearchClick = async () => {
        await handleSearch();
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <input
                type="text"
                value={keyword}
                onChange={handleInputChange}
                placeholder="キーワードを入力"
                style={{
                    width: '400px',
                    height: '40px',
                    fontSize: '1.2rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px 0 0 4px',
                    outline: 'none',
                    boxSizing: 'border-box'
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
                    cursor: 'pointer'
                }}
            >
                🔍検索
            </button>
            <button
                type="button"
                onClick={handleClear}
                style={{
                    marginLeft: '10px',
                    backgroundColor: 'lightgray',
                    color: 'black',
                    border: 'none',
                    height: '40px',
                    padding: '0 20px',
                    borderRadius: '0 4px 4px 0',
                    fontSize: '1.2rem',
                    cursor: 'pointer'
                }}
            >
                × クリア
            </button>

            {results.length > 0 && (
                <table border={1} style={{ marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>名前</th>
                            <th>詳細</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.details}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </form>
    );
};

export default Search;

// Search.tsx の最後に追加
export { };

