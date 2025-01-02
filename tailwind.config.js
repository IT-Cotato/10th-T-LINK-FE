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
    },
  },
  plugins: [],
};
