import { useEffect, useState } from "react";
import { api } from "../api.jsx";

export default function Events() {
  const [events, setEvents] = useState([]);

  const load = async () => {
    const res = await api.get("/events");
    setEvents(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const updateEvent = async (id, patch) => {
    await api.put(`/events/${id}`, patch);
    await load();
  };

  const deleteEvent = async (id) => {
    if (!confirm("Delete event?")) return;
    await api.delete(`/events/${id}`);
    await load();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Events</h3>
      {events.length === 0 && <p>No events.</p>}
      <div className="space-y-4">
        {events.map((evt) => (
          <div
            key={evt._id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h4 className="font-bold">{evt.title}</h4>
              <p className="text-sm text-gray-500">
                {new Date(evt.date).toLocaleString()}
              </p>
              <p>{evt.location}</p>
              <p className="text-sm text-gray-700">
                ₹ {evt.price} | {evt.availableTickets} / {evt.totalTickets} left
              </p>
            </div>
            <div className="space-x-2">
              <button
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                onClick={() => {
                  const title = prompt("Title", evt.title) || evt.title;
                  const price = Number(
                    prompt("Price", evt.price) || evt.price
                  );
                  const totalTickets = Number(
                    prompt("Total Tickets", evt.totalTickets) ||
                      evt.totalTickets
                  );
                  updateEvent(evt._id, { title, price, totalTickets });
                }}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => deleteEvent(evt._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
