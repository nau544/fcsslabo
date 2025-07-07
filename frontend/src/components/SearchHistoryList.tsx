import React, { useEffect, useState } from "react";

// 型定義
type SearchHistory = {
    id: number;
    keyword: string;
    searched_at: string;
};

const SearchHistoryList: React.FC = () => {
    const [data, setData] = useState<SearchHistory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8082/api/search-history")
            .then((res) => res.json())
            .then((json: SearchHistory[]) => setData(json))
            .catch((err) => alert("取得エラー: " + err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            {/* 独自のリスト表示を削除 */}
        </div>
    );
};

export default SearchHistoryList; 