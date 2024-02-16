module.exports = {
  important: true, //https://github.com/tailwindlabs/tailwindcss/discussions/8521#discussioncomment-3901351
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        josefin: ["var(--font-josefin)"],
        mono: ["var(--font-roboto-mono)"],
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
