/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // listStyleType: {
    //   none: "none",
    //   disc: "disc",
    //   decimal: "decimal",
    //   square: "square",
    //   roman: "lower-roman",
    //   alpha: "upper-alpha",
    // },
    extend: {
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic':
      //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      // },
      keyframes: {
        slideDown: {
          "0%": {
            opacity: 0,
            transform: "translateY(-100px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        "fade-in-down": {
          "0%": {
            opacity: 0,
            transform: "translateY(-25px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        moveCon: {
          from: { transform: "translateY(-10px)" },
          to: { transform: "translateY(6px) scale(1.003)" },
        },
      },
      animation: {
        "fade-in-down": "fade-in-down 0.5s ease-out",
        slideDown: "fade-in-down 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
