/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xxs: "370px",
        xs: "465px",
        xss: "593px",
        xd: "844px",
      },
    },
  },
  plugins: [],
};
