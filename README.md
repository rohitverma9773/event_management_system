🎫 Event Management System (MERN Stack)
📌 Overview

The Event Management System is a MERN stack web application that provides two types of login access:

Admin / Event Manager 👨‍💼

User 👤

This platform allows smooth management of events, ticket booking, and user engagement with added interactive features.

🚀 Features
🔐 Authentication & Roles

Admin/Event Manager:

Add, edit, and delete events

View registered users

View booking details

User:

View available events

Book tickets for events

Give reviews and feedback

🎯 Core Functionalities

✅ Event CRUD operations (Create, Read, Update, Delete)
✅ Ticket booking system with booking history
✅ User registration & login system
✅ Reviews & ratings for events

✨ Additional Features

Pagination → Smooth navigation for large lists of events & bookings

Email Notifications →

Sent after user registration

Sent after successful ticket booking

Drag & Drop Cards → Users/Admins can drag and reposition event cards for better interaction

🛠️ Tech Stack

Frontend: React.js, Tailwind CSS / CSS

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JWT (JSON Web Token)

Email Service: Nodemailer

⚙️ Installation & Setup

Clone the repository

git clone https://github.com/rohitverma9773/event_management_system.git
cd event_management_system


Install dependencies

# Install backend dependencies
cd backend
npm install  

# Install frontend dependencies
cd ../frontend
npm install


Set up environment variables
Create a .env file in both backend and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password


Run the project

# Run backend
cd backend
npm start  

# Run frontend
cd ../frontend
npm run dev

Open in browser → http://localhost:5173


📜 License

This project is licensed under the MIT License – feel free to use and modify.
