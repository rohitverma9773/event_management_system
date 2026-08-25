import { useEffect, useState } from "react";
import { api } from "../api.jsx";
import * as XLSX from "xlsx";

export default function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  const load = async () => {
    const res = await api.get("/bookings/all");
    setBookings(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  // ✅ Group bookings by event
  const grouped = bookings.reduce((acc, booking) => {
    const eventTitle = booking.event?.title || "Unknown Event";
    if (!acc[eventTitle]) acc[eventTitle] = [];
    acc[eventTitle].push(booking);
    return acc;
  }, {});

  // ✅ Filter events by search
  const filteredEntries = Object.entries(grouped).filter(([eventTitle]) =>
    eventTitle.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Export student list for a specific event
  const exportExcel = (eventTitle, eventBookings) => {
    const ws = XLSX.utils.json_to_sheet(
      eventBookings.map((b) => ({
        Name: b.user?.name,
        Email: b.user?.email,
        Quantity: b.qty,
        TotalPrice: b.totalPrice,
        RegisteredAt: new Date(b.createdAt).toLocaleString(),
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, `${eventTitle}_Bookings.xlsx`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">All Bookings</h3>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 border rounded-lg focus:ring focus:ring-indigo-300"
      />

      {bookings.length === 0 && <p>No bookings.</p>}

      <div className="space-y-6">
        {filteredEntries.map(([eventTitle, eventBookings]) => (
          <div key={eventTitle} className="border rounded-lg p-4 bg-gray-50">
            {/* Event Header + Download Button */}
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-md font-bold text-indigo-600">{eventTitle}</h4>
              <button
                onClick={() => exportExcel(eventTitle, eventBookings)}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg shadow hover:bg-green-700"
              >
                Download Excel
              </button>
            </div>

            {/* Bookings List */}
            <div className="space-y-3">
              {eventBookings.map((b) => (
                <div
                  key={b._id}
                  className="border p-3 rounded bg-white shadow-sm text-sm"
                >
                  <b>{b.user?.name}</b> ({b.user?.email}) · Qty {b.qty} · ₹{" "}
                  {b.totalPrice}
                  <div className="text-gray-500">
                    {new Date(b.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* If no events match search */}
        {filteredEntries.length === 0 && (
          <p className="text-gray-500">No events found.</p>
        )}
      </div>
    </div>
  );
}
