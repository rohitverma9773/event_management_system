import { useEffect, useState } from "react";
import { api } from "../api.jsx";

export default function RegisteredUsers() {
  const [users, setUsers] = useState([]);

  const load = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Registered Users</h3>
      {users.length === 0 && <p>No users yet.</p>}
      <div className="space-y-3">
        {users.map((u) => (
          <div
            key={u._id}
            className="border p-4 rounded bg-gray-50 text-sm"
          >
            <b>{u.name}</b> — {u.email}
            <div className="text-gray-500">
              {new Date(u.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
