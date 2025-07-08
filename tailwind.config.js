// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        spinner: "spinner 1.2s linear infinite",
      },
      keyframes: {
        spinner: {
          "0%, 20%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
    },
  },
};
