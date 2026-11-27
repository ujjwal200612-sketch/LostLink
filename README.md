# LostLink – Smart Lost and Found Platform

LostLink is a full-stack Lost and Found platform designed to reconnect communities, campuses, and organizations with misplaced belongings.

Users can report lost or found items, browse and search listings, filter by category, view item details, and send inquiries to report owners.

---

## Features

- User registration and login with hashed passwords and JWT authentication
- Report lost and found items
- Upload item photos from a phone or computer
- Browse, search, and filter item listings
- View item details and contact information
- Send and receive inquiries
- User dashboard for reports and received inquiries
- Responsive layout for desktop and mobile screens

## Tech Stack

**Frontend:** React 18, Vite, React Router, Lucide React, HTML and CSS

**Backend:** Node.js, Express, JWT, bcryptjs

**Database and storage:** Supabase (PostgreSQL database and Supabase Storage for item photos)

**Deployment:** Vercel (frontend) and Render (backend)

---

## Project Structure

```text
LostLink/
├── frontend/       # React + Vite application
├── backend/
│   ├── config/     # Supabase configuration
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   └── server.js
├── package.json
└── README.md
```

## Run Locally

### Prerequisites

- Node.js 18 or later
- npm
- A Supabase project

### 1. Clone the repository

```bash
git clone https://github.com/ujjwal200612-sketch/LostLink.git
cd LostLink
```

### 2. Configure the backend

```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and fill in the values from your Supabase project:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
JWT_SECRET=use_a_long_random_secret
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SECRET_KEY=your_supabase_secret_key
```

Keep `.env` private. Never commit Supabase secret keys or production JWT secrets.

Start the backend:

```bash
npm run dev
```

The API runs at `http://localhost:5000`.

### 3. Configure and run the frontend

In a second terminal:

```bash
cd frontend
npm install
```

Create `frontend/.env` with:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Open `http://localhost:5173`.

---

## API Overview

| Method | Endpoint                       | Description                                              |
| ------ | ------------------------------ | -------------------------------------------------------- |
| GET    | `/api/health`                  | Check API and Supabase connectivity                      |
| GET    | `/api/items`                   | Retrieve items                                           |
| GET    | `/api/items/recent`            | Retrieve recent items                                    |
| GET    | `/api/items/my/reports`        | Retrieve reports submitted by the authenticated user     |
| GET    | `/api/items/:id`               | Retrieve item details                                    |
| POST   | `/api/items`                   | Create an item report                                    |
| PUT    | `/api/items/:id`               | Update an item                                           |
| DELETE | `/api/items/:id`               | Delete an item                                           |
| POST   | `/api/auth/register`           | Register a user                                          |
| POST   | `/api/auth/login`              | Log in                                                   |
| GET    | `/api/auth/profile`            | Get the logged-in user's profile                         |
| POST   | `/api/items`                   | Create a lost/found report (authentication required)     |
| PUT    | `/api/items/:id`               | Update your report (authentication required)             |
| DELETE | `/api/items/:id`               | Delete your report (authentication required)             |
| POST   | `/api/items/:itemId/inquiries` | Send an inquiry (authentication required)                |
| GET    | `/api/items/my/inquiries`      | View inquiries on your reports (authentication required) |

---

## Photo Uploads

Item photos can be JPG, PNG, or WEBP files up to 5 MB. The backend uploads photos to the public Supabase Storage bucket named `item-images` and saves the resulting public URL with the item record. The backend needs a Supabase secret key with permission to manage Storage.

## Security Notes

- Passwords are hashed with bcryptjs.
- Protected API routes require a valid JWT bearer token.
- Keep backend environment variables private.
- The Supabase Storage bucket is public so item photos can be displayed without signing in. Do not upload sensitive or private images.

---

**LostLink – Helping lost belongings find their way home.**
