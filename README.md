## Project Structure

The following is the structure of the project, which is designed to ensure scalability, maintainability, and a clear separation of concerns.

```plaintext
src/
│
├── api/               # API service files (Axios instances, API calls)
│   ├── axiosInstance.js
│   ├── videoApi.js
│   └── userApi.js
│
├── assets/            # Static assets (images, fonts, etc.)
│   ├── images/
│   ├── fonts/
│   └── styles/        # Global styles or SCSS
│
├── components/        # Reusable presentational components
│   ├── Button/
│   │   ├── Button.jsx
│   │   ├── Button.module.css
│   │   └── index.js
│   ├── Card/
│   └── Loader/
│
├── constants/         # Constants and configurations
│   ├── routes.js
│   ├── apiRoutes.js
│   └── appConfig.js
│
├── context/           # Context providers for state management
│   ├── AuthContext.js
│   └── ThemeContext.js
│
├── features/          # Feature-specific modules (similar to micro-frontends)
│   ├── authentication/
│   │   ├── components/    # Sub-feature components
│   │   ├── pages/         # Authentication-related pages
│   │   └── services/      # API calls or business logic for authentication
│   ├── videoPlayer/
│   └── dashboard/
│
├── hooks/             # Custom React hooks
│   ├── useAuth.js
│   ├── useFetch.js
│   └── useDebounce.js
│
├── layout/            # Layout components (Navbar, Sidebar, Footer)
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   └── Footer.jsx
│
├── pages/             # Pages (mapped to routes)
│   ├── Home.jsx
│   ├── VideoDetail.jsx
│   └── Profile.jsx
│
├── redux/             # Redux state management
│   ├── slices/        # Redux slices
│   │   ├── videoSlice.js
│   │   └── userSlice.js
│   └── store.js       # Redux store
│
├── routes/            # Centralized route definitions
│   ├── ProtectedRoute.jsx
│   └── AppRoutes.jsx
│
├── services/          # Business logic services (e.g., user authentication)
│   ├── authService.js
│   ├── videoService.js
│   └── analyticsService.js
│
├── utils/             # Utility functions
│   ├── helpers.js
│   ├── formatDate.js
│   ├── validateEmail.js
│   └── debounce.js
│
├── tests/             # Test files
│   ├── unit/          # Unit tests
│   └── integration/   # Integration tests
│
├── App.jsx            # Main application component
├── index.jsx          # React entry point
├── setupTests.js      # Test configuration
├── reportWebVitals.js # Performance metrics
└── tailwind.config.js # Tailwind configuration
