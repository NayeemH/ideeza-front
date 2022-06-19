const colors = require('tailwindcss/colors');
module.exports = {
	mode: 'jit',
	content: ['./src/**/*.tsx', './public/**/*.html'],
	darkMode: 'media', // or 'media' or 'class'
	important: true,
	theme: {
		extend: {
			screens: {
				'3xl': '1919px',
				'2.5xl': '1649px',
			},
			colors: {
				primary: '#ff09d0',
				gray: colors.neutral,
			},
		},
	},
	variants: {
		backgroundColor: ['responsive', 'even', 'odd', 'focus'],
		extend: {},
	},
	plugins: [
		require('@tailwindcss/forms')({
			strategy: 'class',
		}),
		function ({ addBase, config }) {
			addBase({
				h1: { fontSize: config('theme.fontSize.2xl') }, // 1.5rem or 24px
				h2: { fontSize: config('theme.fontSize.xl') }, // 1.25rem or 20px
				h3: { fontSize: config('theme.fontSize.lg') }, // 1.125 or 18px
				h4: { fontSize: config('theme.fontSize.base') }, // 1rem or 16px
				h5: { fontSize: config('theme.fontSize.sm') }, // 0.875 or 14px
				h6: { fontSize: config('theme.fontSize.xs') }, // 0.75 or 12px
			});
		},
	],
};
