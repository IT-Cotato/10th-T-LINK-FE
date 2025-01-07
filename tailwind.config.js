/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        heading2: ['68px'],
        heading3: ['48px'],
        heading4: ['36px'],
        heading5: ['30px'],
        heading6: ['24px'],
        body1: ['20px'],
        body2: ['18px'],
        body3: ['16px'],
        body4: ['14px'],
        caption1: ['12px'],
      },
      colors: {
        // gray
        gray_50: '#F4F4F4',
        gray_100: '#EDEDEC',
        gray_200: '#DFDEDA',
        gray_300: '#C6C4C1',
        gray_400: '#AAA9A6',
        gray_500: '#8D8D8A',
        gray_600: '#6A6967',
        gray_700: '#4E4C49',
        gray_800: '#333331',
        gray_900: '#242421',
        gray_950: '#171715',

        // primary
        primary_50: '#EFFAEA',
        primary_100: '#E1F5D6',
        primary_200: '#C5EEB1',
        primary_300: '#9AEB7C',
        primary_400: '#7EE25D',
        primary_500: '#60CE3F',
        primary_600: '#12B500',
        primary_700: '#008A05',
        primary_800: '#005F0F',
        primary_900: '#00400A',
        primary_950: '#002306',

        // secondary
        second_5: '#FFFBE5',
        second_10: '#FFF6CC',
        second_20: '#FFEE99',
        second_30: '#FFE666',
        second_40: '#FFDA1E',
        second_50: '#FFC800',
        second_60: '#E9B519',
        second_70: '#DEA600',
        second_80: '#BD8100',
        second_90: '#A56600',
        second_100: '#794300',

        // sub
        sub1_5: '#FFE5E5',
        sub1_10: '#FFCCCC',
        sub1_20: '#FF9999',
        sub1_30: '#FF6666',
        sub1_40: '#EC3E3E',
        sub1_60: '#BC0A21',
        sub1_80: '#900013',
        sub1_100: '#59000C',

        sub2_5: '#CEE3FF',
        sub2_10: '#ABD0FF',
        sub2_20: '#77A3FF',
        sub2_30: '#3E7AF6',
        sub2_40: '#1B5FE9',
        sub2_60: '#0E46B8',
        sub2_80: '#08338B',
        sub2_100: '#042363',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
