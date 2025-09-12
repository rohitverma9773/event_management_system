import { useEffect, useState, useCallback } from "react";
import { api } from "../api";
import { useDrag, useDrop } from 'react-dnd';

const ItemTypes = { BOOKING: 'booking' };

const BookingCard = ({ booking, index, moveCard }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BOOKING,
    item: { id: booking._id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.BOOKING,
    hover: (item) => {
      if (!item || !booking) return;
      const sourceIndex = item.index;
      const targetIndex = index;
      if (sourceIndex === targetIndex) return;
      moveCard(sourceIndex, targetIndex);
      item.index = targetIndex;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={node => drag(drop(node))}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        border: isOver ? '2px dashed gray' : 'none'
      }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition relative overflow-hidden"
    >
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
        <h4 className="text-lg font-semibold text-white truncate">
          {booking.event?.title}
        </h4>
        <p className="text-xs text-indigo-100">
          {new Date(booking.event?.date).toLocaleDateString()} •{" "}
          {new Date(booking.event?.date).toLocaleTimeString()}
        </p>
      </div>

      <div className="p-5 space-y-3">
        <p className="text-sm text-gray-500">
          Booked on {new Date(booking.createdAt).toLocaleString()}
        </p>

        <div className="flex justify-between items-center border-b pb-2">
          <span className="text-gray-600">Quantity</span>
          <span className="font-medium">{booking.qty}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Price</span>
          <span className="font-bold text-green-600">₹ {booking.totalPrice}</span>
        </div>

        <div className="mt-3">
          <span className="px-3 py-1 text-xs bg-green-100 text-green-600 font-medium rounded-full">
            ✅ Confirmed
          </span>
        </div>
      </div>

      <div className="absolute top-1/2 -left-4 w-8 h-8 bg-gray-50 rounded-full shadow-inner"></div>
      <div className="absolute top-1/2 -right-4 w-8 h-8 bg-gray-50 rounded-full shadow-inner"></div>
    </div>
  );
};

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get("/bookings/me").then(({ data }) => setBookings(data));
  }, []);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setBookings((prevBookings) => {
      const newBookings = [...prevBookings];
      const draggedBooking = newBookings[dragIndex];
      newBookings.splice(dragIndex, 1);
      newBookings.splice(hoverIndex, 0, draggedBooking);

      // 🔹 Update backend order
      api.put("/bookings/reorder", {
        orderedIds: newBookings.map(b => b._id)
      });

      return newBookings;
    });
  }, []);

  const renderCard = useCallback((booking, index) => {
    return (
      <BookingCard
        key={booking._id}
        index={index}
        booking={booking}
        moveCard={moveCard}
      />
    );
  }, [moveCard]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">🎟️ My Bookings</h3>

      {bookings.length === 0 ? (
        <div className="bg-white shadow p-6 rounded-xl text-center text-gray-500">
          No bookings yet.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking, index) => renderCard(booking, index))}
        </div>
      )}
    </div>
  );
}
