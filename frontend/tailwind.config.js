/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#D14124',
                secondary: '#FCF9F6',
                accent: '#F59E0B',
            }
        },
    },
    plugins: [],
}
