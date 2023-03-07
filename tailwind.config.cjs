// /** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
    mode: 'jit',
    theme: {
        extend: {
            colors: {
                blueD0: '#8DA9C4',
                blueD1: '#134074',
                blueD2: '#13315c',
                blueD3: '#0B2545',
                cream: '#EEF4ED',
            },
            fontFamily: {
                Varino: ['Varinonormal', 'sans-serif'],
                // Varino: ['Neptunes', 'sans-serif'],
                // Varino: ['MandatoryPlaything', 'sans-serif'],
                Poppins: ['Poppins', 'sans-serif'],
                opensans: ['Open Sans', 'sans-serif'],
                Comfortaa: ['Comfortaa', 'cursive'],
            },
            content: {},
        },
        screens: {
            xs: '480px',
            ss: '620px',
            sm: '768px',
            md: '1060px',
            lg: '1200px',
            xl: '1700px',
        },

        animation: {
            'spin-slow': 'spin 3s linear infinite',
            'spin-once': 'spin 0.5s linear',
            spin: 'spin 1.1s linear infinite',
        },
    },
    plugins: [],
}
