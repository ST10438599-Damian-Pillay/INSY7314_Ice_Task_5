# PhotoShare Application

A full-stack photo-sharing application built using the **MERN stack**. The application provides user authentication, profile management, administrator user management, and a photo gallery where users can upload, view, update, and delete photos.

The project consists of a React/Vite frontend and a Node.js/Express backend connected to MongoDB.

---

## Features

### Authentication

* User registration
* User login
* JWT-based authentication
* Protected routes
* User logout
* Authentication token handling

### User Profiles

* View the currently logged-in user's profile
* Update profile information
* Manage account details

### Administration

Administrators have access to a user-management console where they can:

* View registered users
* Modify user details
* Manage administrator privileges
* Delete users

### Photo Gallery

Authenticated users can:

* View photos in a gallery
* Upload new photos
* Update existing photos
* Delete photos
* Manage their uploaded photos

The upload/update functionality uses a reusable modal component.

---

## Technologies Used

### Frontend

* React
* Vite
* JavaScript
* React Router
* Axios
* JWT Decode
* Tailwind CSS
* DaisyUI

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Tokens (JWT)
* REST API

---

## Project Structure

```text
PhotoShare/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── photos/
│   │   │   └── users/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
├── .gitignore
└── README.md
```

---

# Requirements

Before running the application, install the following:

* Node.js
* npm
* MongoDB
* Visual Studio Code or another code editor
* A modern web browser

---

# Installation

## 1. Clone the Repository

Clone the repository to your computer:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Then enter the project directory:

```bash
cd PhotoShare
```

---

# Backend Setup

## 2. Open the Backend Folder

```bash
cd backend
```

Install the backend dependencies:

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a file called:

```text
.env
```

inside the `backend` folder.

Use the `.env.example` file as a guide.

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Replace the placeholder values with your own configuration.

**Do not commit the `.env` file to GitHub.**

---

## 4. Start the Backend

Run:

```bash
npm start
```

If the backend uses a development script, you can also use:

```bash
npm run dev
```

The API should be available at:

```text
http://localhost:5000
```

---

# Frontend Setup

## 5. Open a Second Terminal

From the root project directory:

```bash
cd frontend
```

Install the frontend dependencies:

```bash
npm install
```

---

## 6. Configure the Frontend

Create a file called:

```text
.env
```

inside the `frontend` folder.

Use `.env.example` as the template.

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

If your backend uses a different port or API URL, change this value accordingly.

---

## 7. Start the Frontend

Run:

```bash
npm run dev
```

Vite will display the local development address, normally:

```text
http://localhost:5173
```

Open that address in your browser.

---

# Running the Complete Application

Both the backend and frontend need to be running.

### Terminal 1 — Backend

```bash
cd backend
npm install
npm start
```

### Terminal 2 — Frontend

```bash
cd frontend
npm install
npm run dev
```

Then open:

```text
http://localhost:5173
```

---

# Application Flow

The application follows this general flow:

```text
                    PhotoShare
                       │
          ┌────────────┴────────────┐
          │                         │
        Login                    Register
          │                         │
          └────────────┬────────────┘
                       │
                   Dashboard
                       │
        ┌──────────────┼──────────────┐
        │              │              │
      Gallery        Profile        Admin
        │              │              │
   ┌────┼────┐         │          User Management
   │    │    │         │
 View Upload Update   Edit
   │    │    │
   └────┴────┘
        │
      Delete
```

---

# Frontend Components

The frontend is implemented as a React Single Page Application.

Important components include:

### Authentication

```text
components/auth/
```

Contains the login, registration, and logout functionality.

### Profile

```text
components/users/Profile.jsx
```

Allows the current user to view and update their profile.

### User Management

```text
components/users/Profiles.jsx
```

Provides the administrator with a user-management interface.

### Gallery

```text
components/photos/Gallery.jsx
```

Displays the user's photo gallery.

### Upload / Update Modal

The photo upload form is separated from the gallery and displayed using a modal.

The same form can be used for:

* Uploading a new photo
* Updating an existing photo

This allows the gallery to remain focused on displaying photos while the modal handles photo input.

---

# Authentication

The application uses JWT authentication.

After successful login, the authentication token is stored by the frontend and used when making protected API requests.

Protected routes prevent unauthenticated users from accessing pages that require authentication.

The frontend includes a protected-route utility that checks whether the authentication token is still valid before allowing access to protected pages.

---

# API Communication

The frontend communicates with the backend using Axios.

The API base URL is configured using:

```env
VITE_API_URL
```

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

This allows the frontend and backend to be changed independently without modifying API URLs throughout the React application.

---

# Photo Management

The gallery supports the following operations:

### View

Users can view available photos through the gallery.

### Upload

Users can open the upload modal and select a photo to upload.

### Update

Existing photos can be edited using the same modal used for uploading.

### Delete

Users can delete photos they are permitted to manage.

The backend is responsible for processing the requests and storing the associated photo information.

---

# Administrator Functionality

Administrators have access to additional user-management functionality.

The administrator console allows administrators to manage registered users and modify user information.

Administrative functionality is protected so that normal users cannot access administrator-only operations.

---

# Styling

The frontend uses:

* Tailwind CSS
* DaisyUI

DaisyUI components are used for interface elements such as:

* Buttons
* Forms
* Cards
* Modals
* Navigation
* Tables
* Alerts

Tailwind CSS is used for layout and responsive styling.

---

# Development

When making changes to the frontend:

```bash
cd frontend
npm run dev
```

When making changes to the backend:

```bash
cd backend
npm run dev
```

After making changes, test both sides of the application to ensure that API requests and authentication continue to work correctly.

---

# Environment Variables

Environment files contain configuration values that should not be committed to GitHub.

The repository should contain:

```text
backend/.env.example
frontend/.env.example
```

but not:

```text
backend/.env
frontend/.env
```

The `.env` files should be added to `.gitignore`.

---

# Git Ignore

The repository should not contain generated or sensitive files such as:

```text
node_modules/
.env
dist/
build/
*.log
```

These files should be excluded using `.gitignore`.

---

# Troubleshooting

## Backend Will Not Start

Check that:

1. Node.js is installed.
2. Dependencies have been installed:

```bash
npm install
```

3. The `.env` file exists.
4. MongoDB is running.
5. The configured port is available.

---

## Frontend Will Not Start

Run:

```bash
npm install
```

and then:

```bash
npm run dev
```

Check that the frontend `.env` contains the correct API URL.

---

## API Requests Fail

Make sure that:

* The backend is running.
* The frontend is using the correct API URL.
* The backend port matches the URL configured in the frontend.
* MongoDB is connected.
* The user is authenticated when accessing protected endpoints.

---

## Login Does Not Work

Check:

* The backend is running.
* The database connection is working.
* The user account exists.
* The JWT secret is configured.
* The frontend API URL is correct.

---

# Security

Sensitive information should never be committed to the repository.

Do not commit:

* Database passwords
* MongoDB connection strings containing credentials
* JWT secrets
* API keys
* `.env` files
* Private credentials

Use `.env.example` files to document the required configuration instead.

---

# Project Purpose

This project demonstrates the development of a full-stack MERN photo-sharing application.

It combines a REST API backend with a React Single Page Application and demonstrates:

* Authentication
* Authorization
* CRUD operations
* REST API communication
* React components
* React routing
* Protected routes
* User management
* Photo management
* Responsive web design
* MongoDB data storage


