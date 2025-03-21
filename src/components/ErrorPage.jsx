import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
        <p className="text-2xl md:text-3xl font-semibold text-gray-800 mt-4">
          Oops! Page Not Found
        </p>
        <p className="text-gray-600 mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-block px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
