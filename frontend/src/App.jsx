import { Routes, Route, Navigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MyBookingsPage from './pages/MyBookingsPage';
import ManagerDashboard from './pages/ManagerDashboard';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar'; 
import Footer from './components/Footer';
import About from './pages/About';
import HomePage from './pages/HomePage';
import UpcomingEvents from './components/UpcomingEvent';
// import PaymentPage from './pages/PaymentPage';

export default function App() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Navbar always full width */}
      <Navbar />

      {/* Page Routes */}
      <div className="flex-grow">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/event" element={<UpcomingEvents />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/payment" element={<PaymentPage />} /> */}
          <Route
            path="/my-bookings"
            element={
              <PrivateRoute role="user">
                <DndProvider backend={HTML5Backend}>
                  <MyBookingsPage />
                </DndProvider>
              </PrivateRoute>
            }
          />
          <Route
            path="/manager"
            element={
              <PrivateRoute role="manager">
                <ManagerDashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Footer always full width */}
      <Footer />
    </div>
  );
}
