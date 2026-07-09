# 🏡 Wandulous — Travel Stay Marketplace

Wandulous is a full-stack travel accommodation marketplace where users can browse, list, book, and review stays — similar to Airbnb. It's built with a Node.js/Express backend, MongoDB for data storage, and a server-rendered EJS frontend, with real-world features like secure authentication, image uploads, interactive maps, and review/rating management.

## 🚀 Live Demo
[Live Demo Link](#) *(add your Render deployment URL here)*

## 📸 Features

- **Full CRUD for Listings** — Create, view, update, and delete travel stay listings with images, pricing, and location details.
- **User Authentication & Authorization**
  - Secure signup/login using Passport.js (Local Strategy) with hashed & salted passwords (`passport-local-mongoose`).
  - Resource-level authorization — only a listing's owner can edit/delete it, and only a review's author can delete their own review.
  - Persistent sessions stored in MongoDB (`connect-mongo`) with HTTP-only cookies (7-day expiry).
- **Reviews & Ratings** — Users can add and delete reviews with a 1–5 star rating on listings.
- **Image Uploads** — Listing images are uploaded and stored via Cloudinary using Multer for handling `multipart/form-data`.
- **Interactive Maps** — Each listing's location is geocoded (Mapbox Geocoding API) and displayed with an interactive map (Mapbox GL JS).
- **Flash Messages** — Real-time success/error feedback using `connect-flash`.
- **Custom Error Handling** — Centralized error handling via a custom `ExpressError` class and an async wrapper utility (`wrapAsync`) to avoid repetitive try/catch blocks.
- **RESTful Routing** — Clean, resource-based routes for listings, reviews, and users following REST conventions.
- **Responsive UI** — Built with EJS, EJS-Mate (for reusable layouts/partials like navbar & footer), and Bootstrap 5, including client-side and server-side (Joi) form validation.

## 🛠️ Tech Stack

**Backend:** Node.js, Express.js 5, MongoDB, Mongoose
**Authentication:** Passport.js, passport-local-mongoose
**Session Management:** express-session, connect-mongo
**Validation:** Joi (server-side), Bootstrap validation (client-side)
**File Uploads:** Multer, Cloudinary, multer-storage-cloudinary
**Maps:** Mapbox SDK (Geocoding), Mapbox GL JS
**Templating:** EJS, EJS-Mate
**Other:** method-override (for PUT/DELETE via forms), connect-flash, dotenv

## 📁 Project Structure

```
wandulous/
├── app.js                  # App entry point & middleware setup
├── models/
│   ├── listing.js          # Listing schema (with geometry for map coordinates)
│   ├── review.js           # Review schema
│   └── userregister.js     # User schema (passport-local-mongoose plugin)
├── routes/
│   ├── listings.js         # Listing CRUD routes
│   ├── review.js           # Review routes
│   └── user.js             # Signup/login/logout routes
├── controllers/            # Route handler logic
├── middleware.js           # isLoggedIn, isOwner, isReviewAuthor, saveRedirectUrl
├── utils/
│   ├── Expresserr.js       # Custom error class
│   └── wrapAsync.js        # Async error-handling wrapper
├── views/                  # EJS templates (layouts, partials, pages)
├── public/                 # Static assets (CSS, client-side JS)
└── package.json
```

## ⚙️ Getting Started

### Prerequisites
- Node.js (v22.18.0 or higher)
- MongoDB (local instance or MongoDB Atlas)
- Cloudinary account (for image uploads)
- Mapbox account (for geocoding & maps)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/ishapatidar32/wandulous-.git
   cd wandulous-
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```env
   ATLASDB_URL=your_mongodb_connection_string
   SECRET=your_session_secret
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   MAP_TOKEN=your_mapbox_access_token
   ```

4. Start the server
   ```bash
   npm start
   ```

5. Visit `http://localhost:8080` in your browser.

## 🗺️ Routes Overview

| Method | Route | Description |
|---|---|---|
| GET | `/listings` | View all listings |
| GET | `/listings/new` | Form to create a new listing |
| POST | `/listings` | Create a new listing |
| GET | `/listings/:id` | View a single listing |
| GET | `/listings/:id/edit` | Form to edit a listing (owner only) |
| PUT | `/listings/:id` | Update a listing (owner only) |
| DELETE | `/listings/:id` | Delete a listing (owner only) |
| POST | `/listings/:id/reviews` | Add a review to a listing |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete a review (author only) |
| GET/POST | `/signup` | Register a new user |
| GET/POST | `/login` | Log in |
| GET | `/logout` | Log out |

## 🌱 Future Improvements

- Add responsive media queries for a better mobile experience
- Improve navbar functionality for smaller screens
- Add search and filter functionality for listings
- Add booking/payment integration

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Isha Patidar**
[GitHub](https://github.com/ishapatidar32) · [LinkedIn](#) · [LeetCode](#)
