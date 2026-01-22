# Arkadia Game Portal - Frontend

## Description

**Arkadia Game Portal** is a full-stack web application that allows users to explore, review, and manage a catalog of video games. This repository contains the **Frontend Application** built with **React** and **Vite**.

**IMPORTANT:** This is the **FRONTEND** (React) repository. The backend API code is a separate Express.js application.

The frontend features:
- User authentication (signup, login, Google OAuth)
- Browse and filter games by platform
- View detailed game information and reviews
- Create and manage game reviews
- Admin panel for managing games
- Responsive design with Tailwind CSS

> **Backend Repository:** The backend API code (Express.js) can be found here: [arkadia-gamePortal-project-backend](../arkadia-gamePortal-project-backend)

---

## Instructions to Run This App on Your Computer

### 1. Clone the Repository

```bash
git clone <repository-url>
cd arkadia-gamePortal-project/arkadia-gamePortal-project-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment Variables

Create a `.env.local` file in the root directory of the frontend folder with the following variables:

```env
# Backend API URL - The URL where your Express backend is running
VITE_API_URL=http://localhost:5005

# Google OAuth Client ID - For Google authentication
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

**Important Environment Variables Explanation:**

- **VITE_API_URL**: The base URL of your backend API
  - For **local development**: `http://localhost:5005` (assuming your backend runs on port 5005)
  - For **production**: Your deployed backend URL (e.g., `https://your-backend-app.fly.dev`)
  - This must match the `ORIGIN` variable in your backend `.env` file

- **VITE_GOOGLE_CLIENT_ID**: Your Google OAuth 2.0 Client ID for authentication
  - To get this:
    1. Go to [Google Cloud Console](https://console.cloud.google.com/)
    2. Create a new project or select an existing one
    3. Enable the Google+ API
    4. Create OAuth 2.0 credentials (Web application)
    5. Copy your Client ID
    6. Add authorized JavaScript origins: `http://localhost:5173` (local) and your production URL

### 4. Run the Application

**Development mode (with hot reload):**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
```

**Preview production build locally:**
```bash
npm run preview
```

The application will be running at `http://localhost:5173`

---

## Demo

- **Frontend Deployed:** [Add your Vercel/Netlify link here]
- **Backend API:** [Add your Fly.io/Adaptable API link here]
- **Live Application:** [Full application URL]

---

## Project Features

### Authentication
- User signup with email and password validation
- User login with JWT token storage
- Google OAuth 2.0 integration
- Protected routes (private pages require login)
- Admin-only routes for content management
- Logout functionality

### Game Browsing
- View all games in the catalog
- Filter games by platform (PC, PlayStation, Xbox, Nintendo, etc.)
- View detailed game information
- Search and sort functionality
- Responsive game card layout

### Review System
- Create reviews for games with rating (1-5 stars) and comments
- View all reviews for a specific game
- Edit your own reviews
- Delete your own reviews (or admin can delete any)
- See average rating calculated from all reviews
- Author information displayed for each review

### Admin Panel
- Create new games
- Edit existing game information
- Delete games
- Manage user accounts
- View all games in admin view

---

## Technologies Used

### Frontend Framework & Build Tool
- **React 19**: UI library
- **Vite 7**: Build tool with fast development server
- **React Router DOM 7**: Client-side routing

### Styling
- **Tailwind CSS 4**: Utility-first CSS framework
- **Autoprefixer**: CSS vendor prefixing
- **PostCSS**: CSS processing

### State Management & Authentication
- **React Context API**: Global state management for authentication
- **JWT (via localStorage)**: Token-based authentication
- **Google Auth Library (@react-oauth/google)**: Google OAuth integration

### HTTP Client
- **Axios**: HTTP client for API requests

### Development Tools
- **ESLint 9**: Code linting
- **Node.js**: JavaScript runtime

---

## Project Structure

```
arkadia-gamePortal-project-frontend/
├── src/
│   ├── components/           # Reusable React components
│   │   ├── CreateGame.jsx
│   │   ├── CreateReview.jsx
│   │   ├── EditGame.jsx
│   │   ├── Footer.jsx
│   │   ├── GameList.jsx
│   │   ├── IsAnon.jsx        # Route guard for anonymous users
│   │   ├── IsPrivate.jsx     # Route guard for authenticated users
│   │   ├── Navbar.jsx
│   │   └── ReviewList.jsx
│   ├── context/              # Context API for state management
│   │   └── auth.context.jsx  # Authentication context
│   ├── pages/                # Page components
│   │   ├── AboutPage.jsx
│   │   ├── AdminPanel.jsx
│   │   ├── FilteredGamesPage.jsx
│   │   ├── GameDetails.jsx
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── NotFoundPage.jsx
│   │   └── SignupPage.jsx
│   ├── services/             # API service modules
│   │   ├── auth.service.js   # Authentication API calls
│   │   ├── games.service.js  # Games API calls
│   │   └── review.service.js # Reviews API calls
│   ├── CSS/                  # Component and page styles
│   ├── assets/               # Images, icons, etc.
│   ├── config/               # Configuration files
│   ├── App.jsx               # Main App component
│   ├── main.jsx              # React DOM entry point
│   └── index.css             # Global styles
├── public/                   # Static assets
├── package.json              # Project dependencies
├── vite.config.js            # Vite configuration
├── eslint.config.js          # ESLint configuration
├── vercel.json              # Vercel deployment config
└── README.md                # This file
```

---

## Available Scripts

- **`npm run dev`**: Start development server with hot reload (Vite)
- **`npm run build`**: Build optimized production bundle
- **`npm run preview`**: Preview production build locally
- **`npm run lint`**: Run ESLint to check code quality

---

## Environment Setup Guide

### Prerequisites
- Node.js (v16 or higher)
- npm (usually comes with Node.js)
- Git

### Step-by-Step Setup

1. **Make sure your backend is running** on `http://localhost:5005`
   - Clone and set up the backend first if you haven't
   - Follow the backend README instructions

2. **Clone this repository**
   ```bash
   git clone <repository-url>
   cd arkadia-gamePortal-project/arkadia-gamePortal-project-frontend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create `.env.local` file** in the root directory with:
   ```env
   VITE_API_URL=http://localhost:5005
   VITE_GOOGLE_CLIENT_ID=your_actual_google_client_id
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser** and navigate to `http://localhost:5173`

---

## API Integration

The frontend uses Axios interceptors to automatically attach JWT tokens to requests. The token is stored in localStorage under the key `authToken`.

### Service Modules

- **auth.service.js**: Handles login, signup, and Google authentication
- **games.service.js**: Fetches and manages games data
- **review.service.js**: Handles review creation, deletion, and updates

Each service creates an Axios instance that automatically includes the JWT token in the `Authorization` header.

---

## Authentication Flow

1. User enters email and password on the Login or Signup page
2. Credentials are sent to the backend via `auth.service.js`
3. Backend validates and returns a JWT token
4. Token is stored in localStorage
5. For subsequent requests, the token is automatically included in the `Authorization` header
6. If token is invalid or expired, user is redirected to login

---

## Deployment

### Vercel Deployment (Recommended for React)

1. Push your code to GitHub
2. Go to [Vercel.com](https://vercel.com)
3. Click "New Project" and select your repository
4. Add environment variables:
   - `VITE_API_URL`: Your production backend URL
   - `VITE_GOOGLE_CLIENT_ID`: Your Google Client ID
5. Click "Deploy"

The `vercel.json` file is already configured in this project.

### Other Hosting Options
- **Netlify**: Similar process to Vercel
- **GitHub Pages**: For static hosting (requires additional configuration)
- **Firebase Hosting**: Google's hosting solution

---

## Troubleshooting

### "Cannot connect to API"
- Check if backend is running on port 5005
- Verify `VITE_API_URL` in `.env.local` is correct
- Check CORS settings in backend `.env` ORIGIN variable

### "Google login not working"
- Verify `VITE_GOOGLE_CLIENT_ID` is correctly set
- Ensure the Google Client ID is authorized for `http://localhost:5173` in Google Cloud Console
- Check that Google+ API is enabled

### "Port 5173 already in use"
- Change the port: `npm run dev -- --port 5174`
- Or kill the process using port 5173

### "Blank page or 404 errors"
- Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- Make sure you ran `npm install`
- Check browser console for errors (F12)

---

## Future Enhancements

- [ ] User profile page with review history
- [ ] Game wishlist functionality
- [ ] Advanced filtering and search
- [ ] User ratings history
- [ ] Social features (follow users, etc.)
- [ ] Game recommendations based on reviews
- [ ] Mobile app version
- [ ] Dark mode theme

---

## Authors

Developed as part of the Ironhack Web Development Bootcamp.

---

## License

This project is licensed under the MIT License.
