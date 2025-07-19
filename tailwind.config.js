/** @type {import('tailwindcss').Config} */
export default {
  // 1. Crucial: Tell Tailwind which files to scan for utility classes.
  // Adjust these paths to match where your React components are located.
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // 2. Map your CSS variables defined in @theme to Tailwind utility class names.
      // This allows you to use classes like `bg-background`, `text-foreground`, `bg-primary-blue`, etc.
      colors: {
        // General theme colors
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",

        // Chart colors
        "chart-1": "var(--chart-1)",
        "chart-2": "var(--chart-2)",
        "chart-3": "var(--chart-3)",
        "chart-4": "var(--chart-4)",
        "chart-5": "var(--chart-5)",

        // Specific custom colors from your @theme block
        "primary-blue": "var(--color-primary-blue)",
        "secondary-green": "var(--color-secondary-green)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        "custom-gray-50": "var(--color-custom-gray-50)",
        "custom-gray-100": "var(--color-custom-gray-100)",
        "custom-gray-200": "var(--color-custom-gray-200)",
        "custom-gray-300": "var(--color-custom-gray-300)",
        "custom-gray-400": "var(--color-custom-gray-400)",
        "custom-gray-500": "var(--color-custom-gray-500)",
        "custom-gray-600": "var(--color-custom-gray-600)",
        "custom-gray-700": "var(--color-custom-gray-700)",
        "custom-gray-800": "var(--color-custom-gray-800)",
        "custom-gray-900": "var(--color-custom-gray-900)",
        "my-brand-color": "var(--color-my-brand-color)",

        // Interactive and base colors mapped from your @layer base
        "primary-interactive-color": "var(--primary-interactive-color)",
        "border-base-color": "var(--border-base-color)",
        "card-bg-color": "var(--card-bg-color)",

        // Sidebar colors
        "sidebar-background": "var(--sidebar-background)",
        "sidebar-foreground": "var(--sidebar-foreground)",
        "sidebar-primary": "var(--sidebar-primary)",
        "sidebar-primary-foreground": "var(--sidebar-primary-foreground)",
        "sidebar-accent": "var(--sidebar-accent)",
        "sidebar-accent-foreground": "var(--sidebar-accent-foreground)",
        "sidebar-border": "var(--sidebar-border)",
        "sidebar-ring": "var(--sidebar-ring)",
      },
      // You can also extend other theme properties here, e.g., spacing, fonts, etc.
      borderRadius: {
        lg: "var(--radius)", // Map --radius to the 'lg' border-radius utility
      },
    },
  },
  plugins: [],
};
