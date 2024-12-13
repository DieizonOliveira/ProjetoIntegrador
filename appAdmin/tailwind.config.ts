import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customGray: "#2C2C2C", // Adicionando a nova cor
        customGrayBar: "#BDBDBD", // Adicionando a nova cor
        customBg: "#F7F3F8",
        customButton: "#A8D8E5"
      },
    },
  },
  plugins: [],
};
export default config;
