/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50',
        secondary: '#FF9800',
        functional: '#2196F3',
        background: '#F5F7FA',
        'kid-red': '#ff4d4f',
        'kid-green': '#52c41a',
        'kid-orange': '#faad14'
      },
      fontFamily: {
        kai: ['SimKai', 'STKaiti', 'KaiTi', 'serif']
      },
      fontSize: {
        'kid-lg': ['3rem', { lineHeight: '1.2' }],
        'kid-xl': ['4rem', { lineHeight: '1.2' }],
        'kid-2xl': ['5rem', { lineHeight: '1.2' }]
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem'
      },
      borderRadius: {
        'kid': '1.5rem'
      }
    }
  },
  plugins: []
}
