import React, { useEffect, useState } from "react";

type AppUser = {
  id: number;
  name: string;
  email: string;
};

const AppUserList: React.FC = () => {
  const [users, setUsers] = useState<AppUser[]>([]);

  useEffect(() => {
    fetch("http://localhost:8081/api/appusers")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h2>ユーザー一覧</h2>
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