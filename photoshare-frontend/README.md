# PhotoShare Frontend

React/Vite single-page frontend for the PhotoShare backend supplied with the ICE Task 4 project.

## Requirements

- Node.js 20+ recommended
- PhotoShare backend running on `http://localhost:5000`
- MongoDB/Cloudinary configured for the backend

## Run

```bash
npm install
npm run dev
```

The app defaults to `http://localhost:5173` and calls the backend at `http://localhost:5000/api`.

To change the API URL, copy `.env.example` to `.env` and set:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Implemented from the frontend guide

- React SPA using Vite
- React Router protected routes
- JWT authentication state using `jwt-decode`
- Login and signup
- Navbar and logout
- User profile viewing/updating
- Admin user management: list, promote, demote and delete
- Photo gallery
- Upload form extracted into a DaisyUI modal component
- Gallery upload button opens the modal
- The same modal supports photo updates using props
- Photo delete with owner/admin authorization
- Axios API client with bearer-token interceptor
- Tailwind CSS + DaisyUI styling
