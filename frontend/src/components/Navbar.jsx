import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Navbar() {
  const { auth, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? 'text-yellow-300 after:w-full'
      : 'text-white/90 after:w-0';

  const linkClasses =
    'relative block px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 hover:text-yellow-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-yellow-300 after:transition-all after:duration-300';

  const navLinks = (
    <>
      <Link
        to="/"
        className={`${linkClasses} ${isActive('/')}`}
        onClick={() => setIsOpen(false)}
      >
        Home
      </Link>

      <Link
        to="/event"
        className={`${linkClasses} ${isActive('/event')}`}
        onClick={() => setIsOpen(false)}
      >
        Events
      </Link>

      {auth.user?.role === 'user' && (
        <Link
          to="/my-bookings"
          className={`${linkClasses} ${isActive('/my-bookings')}`}
          onClick={() => setIsOpen(false)}
        >
          My Bookings
        </Link>
      )}

      {auth.user?.role === 'manager' && (
        <Link
          to="/manager"
          className={`${linkClasses} ${isActive('/manager')}`}
          onClick={() => setIsOpen(false)}
        >
          Manager
        </Link>
      )}

      {/* New Links */}

      <Link
        to="/about"
        className={`${linkClasses} ${isActive('/about')}`}
        onClick={() => setIsOpen(false)}
      >
        About
      </Link>

      {!auth.token ? (
        <>
          <Link
            to="/login"
            className={`${linkClasses} ${isActive('/login')}`}
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className={`${linkClasses} ${isActive('/signup')} text-yellow-300 hover:text-yellow-400`}
            onClick={() => setIsOpen(false)}
          >
            Signup
          </Link>
        </>
      ) : (
        <button
          onClick={() => {
            logout();
            setIsOpen(false);
          }}
          className={`${linkClasses} text-red-400 hover:text-red-500 hover:bg-red-400/10`}
        >
          Logout
        </button>
      )}
    </>
  );

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg sticky top-0 z-50 backdrop-blur-lg bg-opacity-80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-extrabold tracking-wide text-white hover:scale-110 hover:text-yellow-300 transition-transform duration-300"
            >
              Eventify
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 items-center">
            {navLinks}
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-yellow-300 transition-colors duration-200"
            >
              {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-indigo-700/90 px-2 pt-2 pb-3 space-y-1 rounded-b-lg">
          {navLinks}
        </div>
      </div>
    </nav>
  );
}
