/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
      }
    },
  },
  daisyui: {
    themes: [
      {
        custom: {
          primary: "#2563eb",
          secondary: "#c4b5fd",
          accent: "#6ee7b7",
          neutral: "#d1d5db",
          "base-100": "#ffffff",
          info: "#7dd3fc",
          success: "#86efac",
          warning: "#fde047",
          error: "#ef4444",
        },
      },
    ],
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require("daisyui")
  ],
};
