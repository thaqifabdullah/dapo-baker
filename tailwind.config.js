const defaultTheme = require('tailwindcss/defaultTheme');

export default {
	content: [
		"./index.html", 
		"./src/**/*.{vue, js, ts, jsx, tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['InterVariable', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [],
}