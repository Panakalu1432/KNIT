RBAC API Backend
This project is a modular Node.js API built with Express, demonstrating JWT-based authentication, Role-Based Access Control (RBAC), and basic CRUD operations using SQLite.

Features Implemented
Technology: Node.js (Express.js)

Database: SQLite (better-sqlite3)

Authentication: JSON Web Tokens (JWT)

Authorization: Role-Based Access Control (RBAC) with Admin and User roles.

Core Entity: Products (CRUD operations).

Structure: Modular, organized into controllers, models, routes, middleware, etc.

Security: Password hashing (bcrypt), basic input sanitization, secure environment variable usage.

API Design: Adheres to REST principles with proper HTTP status codes and API versioning (/v1/).

Project Structure
The structure is designed for scalability and maintainability:

backend/
├── src/
│   ├── controllers/       # Business logic (e.g., authController, productController)
│   ├── models/            # Database abstraction (DAO - Data Access Objects)
│   ├── routes/v1/         # Versioned API endpoints (authRoutes, productRoutes)
│   ├── middleware/        # JWT verification and RBAC checks
│   ├── config/            # Database initialization and connection
│   ├── utils/             # Helper utilities (e.g., custom ApiError class)
│   └── index.js           # Main application entry point
├── database/              # SQLite database file (project.db)
├── .env                   # Environment variables (MUST BE CREATED)
└── package.json           # Dependencies and scripts

Setup and Running the Project
Prerequisites
Node.js (v18 or higher)

npm

1. Install Dependencies
Open your terminal in the project root directory and run:

npm install

2. Create the .env file
Create a file named .env in the root directory (where package.json is located) and add the following configuration:

# .env file content
NODE_ENV=development

# JWT Configuration
JWT_SECRET=YOUR_VERY_STRONG_AND_RANDOM_SECRET_KEY # CHANGE THIS!
JWT_EXPIRES_IN=90d

# Server Port
PORT=3000

Security Note: Do not commit your actual .env file to version control.

3. Start the Server
Start the application in development mode (with auto-restart on changes):

npm run dev
# Or just: npm start

The server will initialize the SQLite database (project.db in the database/ folder) and automatically seed an Admin user.

API Usage and Testing
The API is accessible at http://localhost:3000/api/v1.

1. Authentication (Public Access)
Endpoint

Method

Description

Roles

Body

/v1/auth/register

POST

Create a new default User

Public

{"email": "...", "password": "..."}

/v1/auth/login

POST

Log in and receive a JWT Token

Public

{"email": "...", "password": "..."}

Initial Admin Credentials (Created on first run):

Email: admin@example.com

Password: admin123

Role: Admin

2. Product CRUD (Protected Access)
For all protected routes, you must include the JWT token in the Authorization header: Authorization: Bearer <Your_JWT_Token>.

Endpoint

Method

Description

Required Roles

/v1/products

GET

Get all products

Public (No Token Required)

/v1/products/:id

GET

Get a single product

Public (No Token Required)

/v1/products

POST

Create a new product

User, Admin

/v1/products/:id

PATCH

Update a product

User, Admin

/v1/products/:id

DELETE

Delete a product

Admin ONLY

Scalability and Security Notes
Scalability Strategy
The modular folder structure (separating controllers, models, routes, and middleware) provides an excellent foundation for scaling:

Microservices: Each top-level entity (like Auth, Products, Orders) can be extracted into its own independent microservice, communicating via a message broker (like Kafka or RabbitMQ) or HTTP calls.

Load Balancing: The API is stateless (using JWT), making it easy to deploy multiple instances behind a load balancer to handle increased traffic.

Caching: A caching layer (like Redis) can be introduced at the controller level to store results of frequently accessed, read-heavy endpoints (GET /v1/products).

Security Notes
Password Hashing: Passwords are hashed using bcrypt (synchronous hashing is generally safe for login/register).

JWT Handling: JWT is used for authentication, ensuring the server remains stateless. The JWT_SECRET must be kept highly secure.

RBAC: The restrictTo middleware strictly enforces authorization rules, preventing unauthorized access to sensitive endpoints (like DELETE /v1/products/:id for non-admins).

Input Validation: The controllers include checks for required fields and basic sanitization to prevent common injection attacks. For production, dedicated libraries like express-validator are recommended.