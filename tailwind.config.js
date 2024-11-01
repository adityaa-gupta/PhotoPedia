/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
        sans: ['Poppins', 'sans-serif'],
        elegant: ['Lora', 'serif'],
        interface: ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        sleek: ['Raleway', 'sans-serif'],
        friendly: ['Nunito', 'sans-serif'],
        bold: ['Oswald', 'sans-serif'],
        classic: ['Merriweather', 'serif'],
        attention: ['Bebas Neue', 'sans-serif'],
        soft: ['Quicksand', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
