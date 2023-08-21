/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			boxShadow: {
				out: '0 0 10px 1px rgba(71,85,105,0.4)'
			},
			colors: {
				black: {
					300: '#2b2b2b',
					400: '#1c1c1c',
					600: '#121212'
				}
			},
			transitionProperty: {
				width: 'width',
				height: 'height'
			}
		}
	},
	darkMode: 'class',
	plugins: []
};
