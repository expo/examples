module.exports = {
  plugins: {
    "postcss-react-strict-dom": {
      include: ["src/**/*.{js,jsx,mjs,ts,tsx}"],
    },
    autoprefixer: {},
  },
};
