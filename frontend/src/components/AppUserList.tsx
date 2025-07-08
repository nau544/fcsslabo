import React, { useEffect, useState } from "react";

type AppUser = {
  id: number;
  name: string;
  email: string;
};

const AppUserList: React.FC = () => {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [keyword, setKeyword] = useState(""); // 検索キーワードの状態

  // 検索実行関数
  const handleSearch = () => {
    fetch(`http://localhost:8081/api/appusers/search?keyword=${encodeURIComponent(keyword)}`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  // 初期表示（全件取得）
  useEffect(() => {
    fetch("http://localhost:8081/api/appusers")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h2>ユーザー一覧</h2>
      {/* 検索フォーム */}
      <input
        type="text"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="ID・名前・メールで検索"
      />
      <button onClick={handleSearch}>検索</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppUserList;