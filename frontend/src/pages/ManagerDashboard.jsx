import { useState } from "react";
import AddEvent from "./AddEvent.jsx";
import Events from "./Events.jsx";
import AllBookings from "./AllBookings.jsx";
import RegisteredUsers from "./RegisteredUsers.jsx";

export default function ManagerDashboard() {
  const [activePage, setActivePage] = useState("addEvent");

  const renderPage = () => {
    switch (activePage) {
      case "addEvent": return <AddEvent />;
      case "events": return <Events />;
      case "bookings": return <AllBookings />;
      case "users": return <RegisteredUsers />;
      default: return <AddEvent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-700 border-b pb-2">
          Manager Dashboard
        </h2>
        <div className="space-y-2">
          <button
            onClick={() => setActivePage("addEvent")}
            className={`w-full text-left p-2 rounded transition ${
              activePage === "addEvent" ? "bg-blue-600 text-white" : "hover:bg-gray-100"
            }`}
          >
            ➕ Add Event
          </button>
          <button
            onClick={() => setActivePage("events")}
            className={`w-full text-left p-2 rounded transition ${
              activePage === "events" ? "bg-blue-600 text-white" : "hover:bg-gray-100"
            }`}
          >
            📅 Events
          </button>
          <button
            onClick={() => setActivePage("bookings")}
            className={`w-full text-left p-2 rounded transition ${
              activePage === "bookings" ? "bg-blue-600 text-white" : "hover:bg-gray-100"
            }`}
          >
            📑 All Bookings
          </button>
          <button
            onClick={() => setActivePage("users")}
            className={`w-full text-left p-2 rounded transition ${
              activePage === "users" ? "bg-blue-600 text-white" : "hover:bg-gray-100"
            }`}
          >
            👥 Registered Users
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">{renderPage()}</div>
    </div>
  );
}
