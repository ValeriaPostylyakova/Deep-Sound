import type { Config } from 'tailwindcss'
import { darkThemeConfig } from './src/configs/theme'

const c = darkThemeConfig

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}'
	],

	theme: {
		extend: {
			colors: {
				primary: c.primary,
				secondary: c.secondary,
				tertiary: c.tertiary,
				neutral: c.neutral,
				white: c.white,

				background: c.neutral[100],
				surface: c.tertiary[200]
			},

			borderRadius: {
				xl: '12px',
				'2xl': '16px',
				'3xl': '24px'
			},

			fontFamily: {
				sans: ['Inter', 'sans-serif']
			},

			backdropBlur: {
				glass: '20px'
			},

			boxShadow: {
				primary: `0 10px 40px ${c.primary[500]}30`
			},

			animation: {
				mesh: 'meshMove 20s linear infinite alternate'
			},

			keyframes: {
				meshMove: {
					'0%': {
						transform: 'scale(1) translate(0px,0px)'
					},
					'100%': {
						transform: 'scale(1.2) translate(5%,5%)'
					}
				}
			}
		}
	},

	plugins: []
} satisfies Config
