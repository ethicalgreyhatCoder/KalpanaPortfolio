/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                prometheus: {
                    dark: '#0a0a0a',
                    gold: '#d4af37',
                    fire: '#ff4500',
                    orange: '#ff8c00',
                    dim: 'rgba(255, 255, 255, 0.1)',
                },
                cream: '#FFFCF9',
                'cream-dark': '#F5F5F0',
                'cream-transparent': 'rgba(255, 252, 249, 0.9)',
                'text-primary': '#333333',
                'text-secondary': '#666666',
                accent: '#5A7D7C',
            },
            fontFamily: {
                sans: ['Lato', 'sans-serif'],
                serif: ['"Playfair Display"', 'serif'],
                oxygen: ['Oxygen', 'sans-serif'],
            },
            animation: {
                'marquee-left': 'marquee-left 20s linear infinite',
                'marquee-right': 'marquee-right 20s linear infinite',
                'fade-in-up': 'fadeInUp 1.2s ease-out forwards',
                'fade-in-delay-1': 'fadeInUp 1.2s ease-out 0.4s forwards',
            },
            keyframes: {
                'marquee-left': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                'marquee-right': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            }
        },
    },
    plugins: [],
}
