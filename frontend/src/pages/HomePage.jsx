// src/pages/HomePage.jsx
import UpcomingEvents from '../components/UpcomingEvent';
import About from './About';
import Reviews from './Reviews';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20 text-center">
        <h1 className="text-4xl font-extrabold mb-4">
          Welcome to Eventify
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-white/90">
          Discover and book tickets for the best upcoming events around you.
        </p>
      </section>

      {/* Upcoming Events */}
      <section className="px-6">
        <UpcomingEvents />
      </section>
      {/* About section */}
      <section className="px-6">
        <About />
      </section>


      {/* Reviews section */}
      <section className="px-6">
        <Reviews />
      </section>
    </div>
  );
}
