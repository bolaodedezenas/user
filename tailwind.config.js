/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}"], 
  theme: {
    extend: {
      screens: {
        xs: { max: "400px" }, // telas até 400px
      },
    },
  },
};
