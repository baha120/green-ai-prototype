/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // für App-Router
    "./pages/**/*.{js,ts,jsx,tsx}", // falls du Seiten mit pages nutzt
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}", // optional, falls du einen src-Ordner nutzt
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
