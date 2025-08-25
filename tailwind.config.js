/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 淡橙黄色主题
        primary: {
          50: '#FFF8F0',
          100: '#FFF4E6',
          200: '#FFE4B5',
          300: '#FFD700',
          400: '#FFC107',
          500: '#FF9800',
          600: '#F57C00',
          700: '#E65100',
          800: '#CD853F',
          900: '#8B4513'
        },
        // 中式配色
        chinese: {
          red: '#DC143C',
          gold: '#FFD700',
          cream: '#FFF8DC',
          brown: '#8B4513'
        }
      },
      fontFamily: {
        chinese: ['Microsoft YaHei', 'PingFang SC', 'sans-serif']
      },
      borderRadius: {
        'chinese': '12px'
      },
      backdropBlur: {
        xs: '2px'
      }
    },
  },
  plugins: [],
}