/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1e293b", // Charcoal Gray
        secondary: "#0f172a", // Crimson Red
        accent: "#0073E6", // Vivid Blue
        neutral: {
          light: "#F5F5F5",
          dark: "#1E1E1E",
        },
      },
    },
  },
  plugins: [],
};
