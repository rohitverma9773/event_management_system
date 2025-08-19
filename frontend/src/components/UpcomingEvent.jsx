// src/components/UpcomingEvents.jsx
import { useEffect, useState } from "react";
import { api } from "../api.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { motion } from "framer-motion";

export default function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  // Search filter
  const [search, setSearch] = useState("");

  // Modal state for booking
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [qty, setQty] = useState(1);

  const fetchEvents = async () => {
    try {
      const { data } = await api.get("/events");
      setEvents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const book = async () => {
    if (!auth.token || auth.user.role !== "user") {
      return alert("Login as user to book");
    }
    try {
      await api.post("/bookings", { eventId: selectedEvent._id, qty });
      alert("Booked!");
      setSelectedEvent(null);
      fetchEvents();
    } catch (e) {
      alert(e.response?.data?.message || "Booking failed");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto py-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md p-6 animate-pulse"
          >
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  // Pagination values
  const filteredEvents = events.filter((evt) =>
    evt.title.toLowerCase().includes(search.toLowerCase())
  );
  const indexOfLast = currentPage * eventsPerPage;
  const indexOfFirst = indexOfLast - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  return (
    <div className="py-8">
      <h3 className="text-3xl font-bold text-gray-800 text-center mb-6">
        🎉 Upcoming Events
      </h3>

      {/* Search bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Events Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {currentEvents.map((evt, index) => (
          <motion.div
            key={evt._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between"
          >
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                {evt.title}
              </h4>
              <p className="text-gray-600 mb-4">
                {evt.description || "No description available"}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                📅{" "}
                <span className="font-medium text-gray-700">
                  {new Date(evt.date).toLocaleString()}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                📍 {evt.location || "TBA"}
              </p>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="text-lg font-bold text-purple-600">
                  ₹ {evt.price}
                </p>
                <span
                  className={`inline-block px-3 py-1 text-xs font-medium rounded-full mt-1 ${
                    evt.availableTickets > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {evt.availableTickets > 0
                    ? `${evt.availableTickets} / ${evt.totalTickets} left`
                    : "Sold Out"}
                </span>
              </div>

              <button
                onClick={() => setSelectedEvent(evt)}
                disabled={evt.availableTickets === 0}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-sm ${
                  evt.availableTickets === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-md hover:scale-105"
                }`}
              >
                Book
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center mt-12 text-gray-600">
          No events found.
        </div>
      )}

      {/* Pagination Controls */}
      {filteredEvents.length > eventsPerPage && (
        <div className="flex justify-center items-center gap-2 mt-10">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg font-medium shadow ${
                currentPage === i + 1
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Book Tickets for {selectedEvent.title}
            </h3>
            <label className="block mb-4">
              <span className="text-sm font-medium text-gray-600">
                Number of Tickets
              </span>
              <input
                type="number"
                min="1"
                max={selectedEvent.availableTickets}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </label>
            <button
              onClick={book}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 rounded-lg font-semibold hover:shadow-md hover:scale-105 transition-all"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
