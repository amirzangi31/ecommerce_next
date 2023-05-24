module.exports = {
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
        primary: "#0000FF",
        error: "#e74c3c",
        gray : "#7EC8E3",
        white : "#050A30",
        'whiteone' : "#fff"
      }
    },
  },
  plugins: [],
}