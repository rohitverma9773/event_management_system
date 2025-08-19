import { useEffect, useState } from "react";
import { api } from "../api.jsx";

export default function AllBookings() {
  const [bookings, setBookings] = useState([]);

  const load = async () => {
    const res = await api.get("/bookings/all");
    setBookings(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">All Bookings</h3>
      {bookings.length === 0 && <p>No bookings.</p>}
      <div className="space-y-3">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="border p-4 rounded bg-gray-50 text-sm"
          >
            <b>{b.event?.title}</b> — {b.user?.name} ({b.user?.email}) · Qty{" "}
            {b.qty} · ₹ {b.totalPrice}
            <div className="text-gray-500">
              {new Date(b.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
