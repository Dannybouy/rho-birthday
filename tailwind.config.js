module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        fadeUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(50px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 20s linear infinite",
        fadeUp: "fadeUp 0.5s ease-out forwards",
        fadeIn: "fadeIn 1s ease-in forwards",
        fadeOut: "fadeOut 1s ease-out forwards",
      },
      fontFamily: {
        merchant: ["var(--font-merchant)", "sans-serif"],
        "neue-montreal": ["var(--font-neue-montreal)", "sans-serif"],
        "neue-montreal-regular": [
          "var(--font-neue-montreal-regular)",
          "sans-serif",
        ],
        everett: ["var(--font-everett)", "sans-serif"],
      },
    },
  },
};
