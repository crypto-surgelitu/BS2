# BS2 - Booking System

A modern full-stack booking system built with React, Vite, Tailwind CSS, Node.js, Express, and MySQL.

## 🏗️ Project Structure

```
BS2/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── assets/          # Images, icons, fonts
│   │   ├── styles/          # Tailwind CSS styles
│   │   ├── App.jsx          # Main App component
│   │   └── main.jsx         # Entry point
│   ├── public/              # Static assets
│   ├── index.html           # HTML template
│   ├── package.json         # Frontend dependencies
│   ├── vite.config.js       # Vite configuration
│   ├── tailwind.config.js   # Tailwind configuration
│   └── postcss.config.js    # PostCSS configuration
│
└── backend/                  # Node.js + Express backend
    ├── src/
    │   ├── config/          # Database & environment config
    │   ├── controllers/     # Business logic (MVC)
    │   ├── models/          # Database models (MVC)
    │   ├── routes/          # API routes (MVC)
    │   ├── middleware/      # Authentication & validation
    │   └── server.js        # Express server
    ├── database.sql         # MySQL schema
    ├── package.json         # Backend dependencies
    └── .env.example         # Environment variables template
```

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MySQL** - Relational database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MySQL (v8 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from example:
```bash
cp .env.example .env
```

4. Update `.env` with your database credentials:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=bs2_booking
JWT_SECRET=your_secret_key
```

5. Create database and tables:
```bash
mysql -u root -p < database.sql
```

6. Start the server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get single booking
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking
- `GET /api/bookings/user/:userId` - Get user bookings

### Health Check
- `GET /api/health` - Check API status

## 🗄️ Database Schema

### Users
- id, name, email, password, role, created_at, updated_at

### Rooms
- id, name, type, capacity, price, description, amenities, image_url, status, created_at, updated_at

### Bookings
- id, user_id, room_id, check_in, check_out, guests, total_price, status, created_at, updated_at

## 🔐 Authentication

The system uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_token>
```

## 🎨 Frontend Features

- Modern, responsive UI with Tailwind CSS
- Client-side routing with React Router
- API integration with Axios
- Custom Tailwind components (buttons, cards)
- Proxy configuration for API calls

## 🛠️ Development

### Frontend Development
```bash
cd frontend
npm run dev
```

### Backend Development
```bash
cd backend
npm run dev
```

### Build for Production
```bash
cd frontend
npm run build
```

## 📝 License

ISC

## 👨‍💻 Author

BS2 Development Team