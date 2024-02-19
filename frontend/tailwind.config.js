/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "bright-gray": "#eeeeee",
                "dark-moderate-green": "#7fad39",
                "white-smoke": "#f5f5f5",
                "ratting": "#edbb0e",
                
            }
        },
        screens: {
            "3xl" : {"min": "1301px"},
            "2xl": {"max": "1300px"},
            "xl": {"max": "1200px"},
            "lg": {"max": "1080px"},
            "md-lg": {"max": "991px"},
            "md": {"max": "768px"},
            "sm": {"max": "576px"},
            "xs": {"max": "480px"},
            "2xs": {"max": "340px"},
        }
    },
    plugins: [],
}