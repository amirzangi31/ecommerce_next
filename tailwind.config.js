module.exports = {
  darkMode: ['class'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "admin-content": "#a5b1c2",
        'primary-admin': "#0000FF",
        'error': "#e74c3c",
        'secondary-admin': "#7EC8E3",
        'bg-admin': "#050A30",
        'whiteone': "#fff"
      }
    },
  },
  plugins: [],
}