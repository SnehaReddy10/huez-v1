/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        screen: 'var(--vh)',
      },
      colors: {
        black: {
          900: '#1E201E',
        },
        orange: {
          200: '#e85956',
          500: '#FF7F3E',
        },
        brown: {
          600: '#6f4f1e',
        },
        gray: {
          650: '#8e8e8f',
          950: '#545557',
        },
      },
      keyframes: {
        slide: {
          '0%': {
            transform: 'translateX(-20px) translateY(70px)',
          },
          '100%': {
            transform:
              'translateX(var(--translateX-end, 100px)) translateY(var(--translateY-end, 100px))',
          },
        },
      },
      animation: {
        slide: 'slide 1.5s ease-in-out forwards',
        scaleOut: 'scaleOut 1.5s ease-in-out forwards',
        slideLeft: 'slideLeft 1.5s ease-in-out forwards',
        slideRight: 'slideRight 1.5s ease-in-out forwards',
        slideTop: 'slideTop 1.5s ease-in-out forwards',
        slideBottom: 'slideBottom 1.5s ease-in-out forwards',
        fadeOut: 'fadeOut 3s ease-in-out forwards',
        fadeIn: 'fadeIn 3s ease-in-out forwards',
        slideIn: 'slideIn 1s ease-in-out forwards',
        'spin-10s': 'spin 3s linear infinite',
        'spin-slice': 'spin 1.5s linear infinite',
        easeBounce: 'ease-bounce 2.5s infinite',
        'scale-in': 'scale-in 1.5s forwards',
        'scale-out': 'scale-out 1.5s forwards',
        'rotate-180': 'rotate-280 1.5s forwards',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
