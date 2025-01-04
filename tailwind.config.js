/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        regular: ['Pretendard-Regular'],
        medium: ['Pretendard-Medium'],
        bold: ['Pretendard-Bold'],
        semibold: ['Pretendard-SemiBold'],
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
        secondary_5: '#FFFBE5',
        secondary_10: '#FFF6CC',
        secondary_20: '#FFEE99',
        secondary_30: '#FFE666',
        secondary_40: '#FFDA1E',
        secondary_50: '#FFC800',
        secondary_60: '#E9B519',
        secondary_70: '#DEA600',
        secondary_80: '#BD8100',
        secondary_90: '#A56600',
        secondary_100: '#794300',

        // sub
        sub1_10: '#FFA3EB',
        sub1_20: '#FF7BE2',
        sub1_40: '#FA4CD4',
        sub1_60: '#E242BF',
        sub1_80: '#B83A9C',
        sub1_100: '#A12284',

        sub2_10: '#183A7E',
        sub2_20: '#88ACF4',
        sub2_40: '#5C8EF3',
        sub2_60: '#3270ED',
        sub2_80: '#235DD1',
        sub2_100: '#1D4CAC',
      },
    },
  },
  plugins: [],
};
