# LostLink – Smart Lost and Found Platform

LostLink is a modern, full-stack lost and found platform built to reconnect communities, campuses, and organizations with misplaced items quickly, securely, and transparently.

Featuring a startup-grade UI themed with **premium navy blue, white, and light blue accents**, the application includes smart filtering, verified return mechanisms, real-time status tracking, and a decoupled architecture with React + Vite on the frontend and Express + MongoDB on the backend.

---

## 🚀 Tech Stack

### Frontend
- **React.js (v18+)** with **Vite** for ultra-fast bundling and Hot Module Replacement (HMR).
- **React Router DOM (v6)** for client-side routing.
- **Lucide React** for clean modern iconography.
- **Modern CSS** with CSS Custom Properties, flexbox/grid layout, glassmorphic accents, and responsive typography.

### Backend
- **Node.js** & **Express.js** REST API.
- **MongoDB** with **Mongoose** object modeling.
- **dotenv** for environment configuration.
- **cors** for secure cross-origin resource sharing.
- **bcryptjs** for secure password hashing.
- **jsonwebtoken (JWT)** for stateless token-based authentication.

---

## 📁 Project Structure

```text
LostLink/
├── frontend/
│   ├── public/
│   │   └── logo.svg
│   ├── src/
│   │   ├── assets/
│   │   │   └── lostlink-logo.svg
│   │   ├── components/
│   │   │   ├── Badge.jsx & Badge.css
│   │   │   ├── Button.jsx & Button.css
│   │   │   ├── Card.jsx & Card.css
│   │   │   ├── Footer.jsx & Footer.css
│   │   │   ├── Input.jsx & Input.css
│   │   │   ├── ItemCard.jsx & ItemCard.css
│   │   │   ├── Navbar.jsx & Navbar.css
│   │   │   └── StatCard.jsx & StatCard.css
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx & Dashboard.css
│   │   │   ├── Home.jsx & Home.css
│   │   │   ├── ItemDetails.jsx & ItemDetails.css
│   │   │   ├── Items.jsx & Items.css
│   │   │   ├── Login.jsx & Login.css
│   │   │   ├── NotFound.jsx & NotFound.css
│   │   │   ├── Register.jsx & Register.css
│   │   │   └── ReportItem.jsx & ReportItem.css
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── itemController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Item.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── healthRoutes.js
│   │   └── itemRoutes.js
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── package.json
└── README.md
```

---

## ⚡ Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [MongoDB](https://www.mongodb.com/) (Local Community Server running on `mongodb://127.0.0.1:27017` or a MongoDB Atlas connection string)

---

### 1. Backend Setup

Open a terminal and navigate to `backend/`:

```bash
cd backend
npm install
```

Configure your environment variables in `backend/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/lostlink
JWT_SECRET=lostlink_super_secret_jwt_key_2026
CLIENT_URL=http://localhost:5173
```

Start the backend server:

```bash
# Development mode (with live watch)
npm run dev

# Or standard production start
npm start
```

The API will be live at: **`http://localhost:5000`**
- Health status endpoint: `GET http://localhost:5000/api/health`
- Items directory endpoint: `GET http://localhost:5000/api/items`

> **Note:** If MongoDB is offline or not installed yet, the server still boots safely and serves memory-backed demo data with a clear console notice, allowing uninterrupted frontend development.

---

### 2. Frontend Setup

Open another terminal and navigate to `frontend/`:

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
```

Open your browser at: **`http://localhost:5173`**

To produce an optimized production build:
```bash
npm run build
```

---

### 3. Root Level Convenience Commands

From the root `LostLink/` directory, you can also run:

- `npm run server` – Launches the backend in dev watch mode.
- `npm run client` – Launches the frontend Vite dev server.
- `npm run build` – Builds the production frontend bundle.

---

## 🔌 API Endpoints Summary

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Service uptime and MongoDB connection state | No |
| `GET` | `/api/items` | List items with filters (`type`, `category`, `search`) | No |
| `GET` | `/api/items/recent` | Recent 6 items for home showcase | No |
| `GET` | `/api/items/:id` | Get details for an item by ID | No |
| `POST` | `/api/items` | Submit a new lost or found notice | Optional |
| `PUT` | `/api/items/:id` | Update an existing item notice | Optional |
| `DELETE` | `/api/items/:id` | Remove an item notice | Optional |
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Authenticate and obtain JWT token | No |
| `GET` | `/api/auth/profile` | Retrieve authenticated user profile | Yes (Bearer) |

---

## 🎨 Design Direction

- **Primary Colors:** Deep Navy (`#0A2540`, `#06182B`), Vibrant Blue (`#2563EB`), Electric Light Sky Blue (`#38BDF8`).
- **Surfaces & Accents:** Clean White (`#FFFFFF`), Soft Slate Background (`#F8FAFC`), Ice Blue Accents (`#E0F2FE`).
- **Status Indicators:** Red pill for Lost items (`#EF4444`), Emerald pill for Found items (`#10B981`), Amber pill for Claimed items (`#F59E0B`).
- **Typography:** Plus Jakarta Sans & Inter with fluid scales and clear visual hierarchy.

---

## 📄 License
ISC License. Built for CSIT Lost & Found application development.
