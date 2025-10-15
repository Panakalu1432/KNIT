# 🧶 Knit App — Full Stack Web Application

This is a full-stack project built using **React.js**, **Tailwind CSS**, **Node.js**, **Express**, and **SQLite3**.  
It includes user authentication (JWT), protected routes, and CRUD operations for managing items or tasks.

---

## 🚀 Tech Stack

**Frontend**
- React.js (Vite)
- Tailwind CSS
- Axios
- React Router DOM

**Backend**
- Node.js + Express.js
- SQLite3 Database
- bcryptjs for password hashing
- jsonwebtoken for authentication
- dotenv for environment variables

---

## 📂 Folder Structure

knit/
│
├── frontend/ # React + Tailwind Frontend
│ ├── src/
│ │ ├── pages/ # Login, Register, Dashboard
│ │ ├── components/ # Navbar, Forms, etc.
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── public/
│ ├── tailwind.config.js
│ ├── postcss.config.js
│ └── package.json
│
└── backend/ # Node.js + Express Backend
├── src/
│ ├── routes/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ └── index.js
├── database.sqlite
├── .env
└── package.json  



---

## ⚙️ Setup Instructions

### 🖥️ Backend Setup

1. Open terminal and navigate:
   
   cd backend
   npm install
   npm start 

### 🖥️ frontend Setup

2. Open terminal and navigate:

    cd frontend
    npm install
    npm start
    npm run dev


🧍 Auth Routes
Method	Endpoint	Description	Auth Required
POST	/api/v1/auth/register	Register new user as admin use "admin" email ✅
POST	/api/v1/auth/login	Login existing user ✅

👤 User Routes
Method	Endpoint	Description	Auth Required
GET	/api/v1/users/me	Get logged-in user profile	✅


📦 Product (Entity) Routes
Method	Endpoint	Description	Auth Required
GET	/api/v1/products	Fetch all products	✅
POST	/api/v1/products	Create new product	✅
GET	/api/v1/products/:id	Get single product by ID	✅
PUT	/api/v1/products/:id	Update a product	✅
DELETE	/api/v1/products/:id	Delete a product	✅


✨ Features
Frontend

Responsive (Desktop + Mobile) using Tailwind CSS

JWT-based authentication

CRUD operations for entities

Protected routes with redirects

Dynamic search and filter

Error/success handling

Backend

Node.js + Express REST API

SQLite3 local database

Password hashing using bcryptjs

JWT-based authentication

Modular and clean route structure


🧰 Common Issues 

Issue	                             

SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email

secretOrPrivateKey must have a value

Server not starting

Solution

You tried to register a user that already exists. Delete the database file or use a new email.

Add JWT_SECRET in your .env file. 

.env
    PORT=3000
    JWT_SECRET=mysecretkey


Ensure all dependencies are installed and .env file is present.


🧑‍💻 Developer

Built with ❤️ by venkat
If you like this project, ⭐ star the repo on GitHub!