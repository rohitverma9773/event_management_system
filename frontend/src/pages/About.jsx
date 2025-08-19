export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            About <span className="text-indigo-600">Eventify</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide an all-in-one platform to make organizing and attending events effortless,
            efficient, and enjoyable for everyone.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-indigo-500">
            <h2 className="text-xl font-bold text-gray-800 mb-2">🎯 Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To empower event organizers with intuitive tools to create, manage, and promote
              successful events while providing attendees with a smooth ticket booking and event
              discovery experience.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-pink-500">
            <h2 className="text-xl font-bold text-gray-800 mb-2">🌟 Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To become the most trusted and innovative platform for event management worldwide,
              where every event is a success story and every attendee leaves with a smile.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-100 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">🚀 What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-indigo-600 mb-2">Event Creation</h3>
              <p className="text-gray-600 text-sm">
                Managers can easily create, edit, and delete events with detailed descriptions,
                schedules, and ticket pricing.
              </p>
            </div>
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-pink-600 mb-2">Ticket Booking</h3>
              <p className="text-gray-600 text-sm">
                Users can quickly browse events, book tickets, and view their booking history.
              </p>
            </div>
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-purple-600 mb-2">Feedback & Support</h3>
              <p className="text-gray-600 text-sm">
                Attendees can share their feedback, helping organizers improve future events.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Ready to make your next event a success?
          </h2>
          <p className="text-gray-600 mb-6">
            Whether you're an event manager or an attendee, our platform is built to give you the
            best experience.
          </p>
          <a
            href="/signup"
            className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition-colors"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}
