module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4B5563',
          dark: '#E5E7EB',
        },
        secondary: {
          light: '#1F2937',
          dark: '#F3F4F6',
        },
        accent: {
          light: '#3B82F6',
          dark: '#60A5FA',
        },
      },
      fontFamily: {
        dyslexic: ['OpenDyslexic', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

