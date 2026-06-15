/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#09090f",
        panel: "#14141f",
        iq: "#ff5ca8",
        base: "#4f7cff",
        lime: "#b9ff66",
      },
      boxShadow: {
        glow: "0 0 40px rgba(255, 92, 168, 0.15)",
      },
    },
  },
  plugins: [],
};
