// tailwind.config.js
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#111827",
        primary: "#1d4ed8",
        "primary-foreground": "#ffffff",
        secondary: "#f3f4f6",
        "secondary-foreground": "#1f2937",
        destructive: "#ef4444",
        "destructive-foreground": "#ffffff",
        accent: "#e5e7eb",
        "accent-foreground": "#111827",
        muted: "#f9fafb",
        "muted-foreground": "#6b7280",
        input: "#d1d5db",
        ring: "#3b82f6",
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};

// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         primary: "#1d4ed8",
//         "primary-foreground": "#ffffff",

//         destructive: "#ef4444",
//         "destructive-foreground": "#ffffff",

//         secondary: "#f3f4f6",
//         "secondary-foreground": "#1f2937",

//         accent: "#e5e7eb",
//         "accent-foreground": "#111827",

//         muted: "#f9fafb",
//         "muted-foreground": "#6b7280",

//         background: "#ffffff",
//         foreground: "#111827",

//         input: "#d1d5db",
//         ring: "#3b82f6",
//       },
//     },
//   },
//   plugins: [],
// };
