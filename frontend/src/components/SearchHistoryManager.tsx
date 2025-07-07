import React, { useState } from "react";

type SearchHistory = {
    id: number;
    keyword: string;
    searched_at: string;
};

const SearchHistoryManager: React.FC = () => {
    const [keyword, setKeyword] = useState("");
    const [search, setSearch] = useState("");
    const [message, setMessage] = useState("");
    const [results, setResults] = useState<SearchHistory[]>([]);

    // 追加
    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        try {
            const res = await fetch("http://localhost:8082/api/search-history", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ keyword }),
            });
            if (res.ok) {
                setMessage("追加成功！");
                setKeyword("");
                handleSearch(); // 追加後に再検索
            } else {
                setMessage("追加失敗");
            }
        } catch {
            setMessage("エラーが発生しました");
        }
    };

    // 検索
    const handleSearch = async () => {
        try {
            const url =
                search.trim() === ""
                    ? "http://localhost:8082/api/search-history"
                    : `http://localhost:8082/api/search-history?keyword=${encodeURIComponent(
                        search
                    )}`;
            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                setResults(data);
            } else {
                setResults([]);
            }
        } catch {
            setResults([]);
        }
    };

    return (
        <div>
            {/* 独自の検索・追加フォーム、リスト表示を削除 */}
        </div>
    );
};

export default SearchHistoryManager; 