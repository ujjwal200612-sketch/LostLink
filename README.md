# LostLink – Smart Lost and Found Platform

LostLink is a full-stack Lost and Found platform designed to reconnect communities, campuses, and organizations with misplaced belongings.

It provides a centralized platform where users can report lost items, report found items, browse listings, search for belongings, and communicate with people who may have information about an item.

Built with a modern navy-blue and white interface, LostLink aims to make the process of finding and returning misplaced belongings simple, accessible, and transparent.

---

## 🚀 Features

- **User Authentication** – User registration and login.
- **Report Lost Items** – Create reports for misplaced belongings.
- **Report Found Items** – List items that have been found.
- **Browse Items** – Explore lost and found listings.
- **Smart Search** – Search for items using keywords.
- **Category Filtering** – Filter items by category and type.
- **Item Details** – View information about reported belongings.
- **Inquiry System** – Send messages regarding reported items.
- **User Dashboard** – View reports, activity, and received inquiries.
- **Responsive Design** – Clean interface for different screen sizes.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- React Router DOM
- Lucide React
- HTML5 and CSS3

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- dotenv
- CORS

---

## 📁 Project Structure

```text
LostLink/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── server.js
│
├── .gitignore
├── package.json
└── README.md
```

---

## ⚡ Getting Started

### Prerequisites

Install the following:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (local installation or MongoDB Atlas)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/ujjwal200612-sketch/LostLink.git
cd LostLink
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/lostlink
JWT_SECRET=replace_with_a_secure_secret
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

The backend will run at:

`http://localhost:5000`

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the application:

`http://localhost:5173`

---

## 🔌 API Overview

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Check server and database status |
| GET | `/api/items` | Retrieve items |
| GET | `/api/items/recent` | Retrieve recent items |
| GET | `/api/items/:id` | Retrieve item details |
| POST | `/api/items` | Create an item report |
| PUT | `/api/items/:id` | Update an item |
| DELETE | `/api/items/:id` | Delete an item |
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Log in a user |
| GET | `/api/auth/profile` | Retrieve user profile |

---

## 🎨 Design

LostLink uses a modern and minimal visual identity.

- **Primary:** Deep Navy Blue
- **Secondary:** Vibrant Blue
- **Background:** Soft White and Light Slate
- **Accents:** Light Blue
- **Typography:** Modern, readable sans-serif fonts

The interface is designed to provide a clean and user-friendly experience.

---

## 🔒 Security

- Password hashing using bcryptjs.
- JWT-based authentication.
- Environment variables for sensitive configuration.
- `.env` files excluded from Git using `.gitignore`.

---

## 📄 License

This project is licensed under the ISC License.

---

**LostLink – Helping lost belongings find their way home.**