import type { Config } from "tailwindcss";

export default {
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
        error: "var(--error)",
        link: "var(--link)",
        warning: "var(--warning)",
        success: "var(--success)",
        neutrals_1: "var(--neutrals-1)",
        neutrals_2: "var(--neutrals-2)",
        neutrals_3: "var(--neutrals-3)",
        neutrals_4: "var(--neutrals-4)",
        neutrals_5: "var(--neutrals-5)",
        neutrals_6: "var(--neutrals-6)",
        disable: "var(--disable)",
        1: "var(--text-1)",
        2: "var(--text-2)",
        3: "var(--text-3)",
        brand_main: "var(--brand_main)",
        brand_1: "var(--brand_1)",
        brand_2: "var(--brand_2)",
        brand_1_hover: "var(--brand_1_hover)",
        gradien_button_hover: "#2F35FD",
      },
      backgroundImage: {
        gradient: "linear-gradient(to bottom, #31D366,#196D35)",
        gradient_header:
          "linear-gradient(91deg, rgba(30, 27, 56, 0.00) -43.35%, rgba(30, 27, 56, 0.55) 111.82%)",
        gradien_button: "linear-gradient(90deg, #5054FD 0%, #18C8FF 100%)",
        gradien_button_hover:
          "linear-gradient(90deg, #5054FD 0%, #5054FD 100%)",
        gradient_title:
          "linear-gradient(58deg, rgba(255, 255, 255, 0.75) 17.1%, #18C8FF 196.45%)",
        gradient_dashboard:
          "linear-gradient(119deg, rgba(64, 173, 255, 0.55) -10.27%, rgba(101, 82, 254, 0.15) 168.7%)",
        gradient_dashboard_item:
          "linear-gradient(91deg, rgba(23, 74, 255, 0.15) -43.35%, rgba(23, 74, 255, 0.55) 111.82%)",
        gradient_dark:
          "linear-gradient(180deg, rgba(11, 11, 15, 0.75) 0%, rgba(15, 15, 18, 0.55) 100%)",
        gradient_footer:
          "linear-gradient(91deg, rgba(30, 27, 56, 0.55) -43.35%, rgba(30, 27, 56, 0.00) 111.82%)",
        gradient_tab:
          "linear-gradient(91deg, rgba(30, 27, 56, 0.00) -43.35%, rgba(30, 27, 56, 0.55) 111.82%)",
      },
      backdropBlur: {
        custom: "9.3px",
      },
    },
  },
  plugins: [],
} satisfies Config;
