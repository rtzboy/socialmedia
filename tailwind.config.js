/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			boxShadow: {
				out: '0 0 10px 1px rgba(71,85,105,0.4)'
			}
		}
	},
	plugins: []
};
