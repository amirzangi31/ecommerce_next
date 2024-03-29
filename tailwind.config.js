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
    container: {
      
      screens: {
       
        '2xl': '1300px',
      }
    },
    extend: {
      colors: {

        "bg-body": "#141a2a",
        bg: {
          primary: "#1649ff",
          secondary: "#a6acb8",
          three: "#1d263b"
        },
        text: {
          primary: "#fff",
          secondary: "#7a8090"
        },


        "admin-content": "#FBE7C6",
        'primary-admin': "#A0E7E5",
        'error': "#FA26A0",
        'secondary-admin': "#FFAEBC",
        'bg-admin': "#B4F8C8",
        'whiteone': "#78A2CC",
        dark: {
          "admin-content": "#a5b1c2",
          'primary-admin': "#0000FF",
          'error': "#e74c3c",
          'secondary-admin': "#7EC8E3",
          'bg-admin': "#050A30",
          'whiteone': "#fff",
        }
      },
      keyframes: {
        fadeInNav: {
          '0%': { left: "-100%" },
          '100%': { left: "0%" },
        }
      }
    },
  },
  plugins: [],
}