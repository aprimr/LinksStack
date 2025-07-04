/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "ui-sans-serif", "system-ui"],
        poppins: ["Poppins", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
