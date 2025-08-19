import { useEffect, useState } from "react";
import { api } from "../api";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get("/bookings/me").then(({ data }) => setBookings(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">🎟️ My Bookings</h3>

      {bookings.length === 0 ? (
        <div className="bg-white shadow p-6 rounded-xl text-center text-gray-500">
          No bookings yet.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition relative overflow-hidden"
            >
              {/* Event Title */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
                <h4 className="text-lg font-semibold text-white truncate">
                  {b.event?.title}
                </h4>
                <p className="text-xs text-indigo-100">
                  {new Date(b.event?.date).toLocaleDateString()} •{" "}
                  {new Date(b.event?.date).toLocaleTimeString()}
                </p>
              </div>

              {/* Booking Info */}
              <div className="p-5 space-y-3">
                <p className="text-sm text-gray-500">
                  Booked on {new Date(b.createdAt).toLocaleString()}
                </p>

                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600">Quantity</span>
                  <span className="font-medium">{b.qty}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Price</span>
                  <span className="font-bold text-green-600">
                    ₹ {b.totalPrice}
                  </span>
                </div>

                {/* Status */}
                <div className="mt-3">
                  <span className="px-3 py-1 text-xs bg-green-100 text-green-600 font-medium rounded-full">
                    ✅ Confirmed
                  </span>
                </div>
              </div>

              {/* Decorative Ticket Edge */}
              <div className="absolute top-1/2 -left-4 w-8 h-8 bg-gray-50 rounded-full shadow-inner"></div>
              <div className="absolute top-1/2 -right-4 w-8 h-8 bg-gray-50 rounded-full shadow-inner"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
