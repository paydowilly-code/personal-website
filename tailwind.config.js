/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#030407",
          900: "#06070A",
          850: "#0B0D12",
          800: "#11141B",
        },
        ember: {
          500: "#FF7A1A",
          400: "#FF9A2E",
          600: "#E85D04",
          gold: "#FFC857",
          red: "#FF4D2E",
        },
      },
      maxWidth: {
        portfolio: "1700px",
      },
      boxShadow: {
        ember: "0 0 40px rgba(255, 122, 26, 0.18)",
        "ember-strong": "0 0 70px rgba(255, 154, 46, 0.28)",
      },
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
