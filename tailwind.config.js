/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                'mobile-lg': '900px',
            },
            colors: {
                prometheus: {
                    dark: '#0a0a0a',
                    gold: '#d4af37',
                    fire: '#ff4500',
                    orange: '#ff8c00',
                    dim: 'rgba(255, 255, 255, 0.1)',
                },
                // Nude Elegance Palette
                cream: '#FAF9F6', // Cream White
                beige: '#F5E6D3', // Soft Beige
                nude: '#C6A87C', // Warm Nude
                rosegold: '#B76E79', // Rose Gold

                // Theme Semantic Mapping
                theme: {
                    bg: '#FAF9F6', // Cream White
                    text: '#4A4A4A', // Soft elegant dark gray
                    'text-accent': '#C6A87C', // Warm Nude
                    'surface': '#F5E6D3', // Soft Beige
                    'border': '#E0BFB8', // Rose Gold Light
                    'highlight': '#B76E79', // Rose Gold
                },
            },
            fontFamily: {
                sans: ['Montserrat', 'sans-serif'],
                serif: ['"Libre Baskerville"', 'serif'],
            },
            backgroundImage: {
                'gradient-nude': 'linear-gradient(135deg, #F5E6D3 0%, #FAF9F6 100%)',
                'gradient-rosegold': 'linear-gradient(135deg, #B76E79 0%, #C6A87C 100%)',
            },
            animation: {
                'marquee-left': 'marquee-left 20s linear infinite',
                'marquee-right': 'marquee-right 20s linear infinite',
                'fade-in-up': 'fadeInUp 1.2s ease-out forwards',
                'fade-in-delay-1': 'fadeInUp 1.2s ease-out 0.4s forwards',
                'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
