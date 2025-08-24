/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: '#eb8228',    // Neon Orange
        secondary: '#f5f0ea',  // Soft Peach
        accent: '#FFFFFF',      // White
      },
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
        'heading': ['Poppins', 'sans-serif'],
        'body': ['Roboto', 'sans-serif'],
      },
      fontSize: {
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
    },
  },
  plugins: [],
} 