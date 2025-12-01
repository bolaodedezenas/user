/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        // Breakpoints mínimos (mobile-first)
        xxs: "370px", // >= 370px
        xs: "465px", // >= 465px
        xss: "593px", // >= 593px
        xd: "844px", // >= 844px

        // Breakpoints máximos
        "max-xxs": { max: "369px" }, // <= 369px
        "max-xs": { max: "464px" }, // <= 464px
        "max-xss": { max: "592px" }, // <= 592px
        "max-xd": { max: "843px" }, // <= 843px
      },
    },
  },
  plugins: [],
};
