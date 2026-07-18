import { darkThemeConfigs } from '../configs/theme'

type ThemeTokens = typeof darkThemeConfigs

declare module '@mui/material/styles' {
	interface Theme {
		custom: {
			tokens: ThemeTokens
		}
	}
	interface ThemeOptions {
		custom?: {
			tokens: ThemeTokens
		}
	}
}
