/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#57A1DA',
        'blue': '#0179FE',
        'hover-btn': '#085ED6',
      },
    }
  },
  plugins: []
};
