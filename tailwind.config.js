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
         // ATÉ 370px
        "max-xxs": { raw: "(max-width: 370px)" },

        // ATÉ 465px
        "max-xs": { raw: "(max-width: 465px)" },

        // ATÉ 593px
        "max-xss": { raw: "(max-width: 593px)" },

        // ATÉ 950px
        "max-xd": { raw: "(max-width: 950px)" },
      
      },
    },
  },
  plugins: [],
};
