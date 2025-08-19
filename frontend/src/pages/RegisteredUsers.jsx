import { useEffect, useState } from "react";
import { api } from "../api.jsx";
import * as XLSX from "xlsx";

export default function RegisteredUsers() {
  const [users, setUsers] = useState([]);

  const load = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  // ✅ Export as Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      users.map((u) => ({
        Name: u.name,
        Email: u.email,
        RegisteredAt: new Date(u.createdAt).toLocaleString(),
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    XLSX.writeFile(wb, "RegisteredUsers.xlsx");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Registered Users</h3>

      {/* Download Button */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={exportExcel}
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          Download Excel
        </button>
      </div>

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
