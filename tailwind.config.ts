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
        error:"var(--error)",
        link:"var(--link)",
        warning:"var(--warning)",
        success:"var(--success)",
        neutrals_1:"var(--neutrals-1)",
        neutrals_2:"var(--neutrals-2)",
        neutrals_3:"var(--neutrals-3)",
        neutrals_4:"var(--neutrals-4)",
        neutrals_5:"var(--neutrals-5)",
        neutrals_6:"var(--neutrals-6)",
        disable:"var(--disable)",
        1:"var(--text-1)",
        2:"var(--text-2)",
        3:"var(--text-3)",
        brand_main:"var(--brand_main)",
        brand_1:"var(--brand_1)",
        brand_2:"var(--brand_2)",
        brand_3:"var(--brand_3)",
        brand_4:"var(--brand_4)",
        brand_5:"var(--brand_5)",
        brand_6:"var(--brand_6)",
      },
      backgroundImage:{
        gradient:'linear-gradient(to bottom, #31D366,#196D35)'
      }
    },
  },
  plugins: [],
} satisfies Config;
