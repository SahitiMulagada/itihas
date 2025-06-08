/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require('@tailwindcss/typography')],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'float-slow': 'floatSlow 16s ease-in-out infinite',
        'float-medium': 'floatMedium 12s ease-in-out infinite',
        'float-fast': 'floatFast 8s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
      },
      keyframes: {
        floatSlow: {
          '0%': { transform: 'translate(0px, 0px) rotate(0deg)' },
          '25%': { transform: 'translate(100px, 50px) rotate(5deg)' },
          '50%': { transform: 'translate(0px, 100px) rotate(-5deg)' },
          '75%': { transform: 'translate(-100px, 50px) rotate(5deg)' },
          '100%': { transform: 'translate(0px, 0px) rotate(0deg)' },
        },
        floatMedium: {
          '0%': { transform: 'translate(0px, 0px) rotate(0deg)' },
          '25%': { transform: 'translate(-80px, 80px) rotate(-5deg)' },
          '50%': { transform: 'translate(80px, -60px) rotate(5deg)' },
          '75%': { transform: 'translate(40px, -80px) rotate(-5deg)' },
          '100%': { transform: 'translate(0px, 0px) rotate(0deg)' },
        },
        floatFast: {
          '0%': { transform: 'translate(0px, 0px) rotate(0deg)' },
          '25%': { transform: 'translate(60px, -40px) rotate(5deg)' },
          '50%': { transform: 'translate(-40px, -60px) rotate(-5deg)' },
          '75%': { transform: 'translate(-60px, 40px) rotate(5deg)' },
          '100%': { transform: 'translate(0px, 0px) rotate(0deg)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
    },
  },
  plugins: [],
}
