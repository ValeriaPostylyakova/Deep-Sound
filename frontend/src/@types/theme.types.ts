import { darkThemeConfig } from '../configs/theme'

type ThemeTokens = typeof darkThemeConfig

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

	interface Theme {
		animations: {}
	}

	interface ThemeOptions {
		animations?: {}
	}
}
