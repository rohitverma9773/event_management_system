import { useState } from "react";
import { api } from "../api.jsx";

export default function AddEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    price: "",
    totalTickets: "",
  });

  const createEvent = async (e) => {
    e.preventDefault();
    try {
      await api.post("/events", {
        ...form,
        price: Number(form.price),
        totalTickets: Number(form.totalTickets),
        date: new Date(form.date).toISOString(),
      });
      alert("Event created successfully!");
      setForm({
        title: "",
        description: "",
        date: "",
        location: "",
        price: "",
        totalTickets: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Create failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Create Event</h3>
      <form
        onSubmit={createEvent}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          className="border p-2 rounded"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          type="datetime-local"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Total Tickets"
          type="number"
          value={form.totalTickets}
          onChange={(e) =>
            setForm({ ...form, totalTickets: e.target.value })
          }
        />
        <textarea
          className="border p-2 rounded md:col-span-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition md:col-span-2"
        >
          Add Event
        </button>
      </form>
    </div>
  );
}
