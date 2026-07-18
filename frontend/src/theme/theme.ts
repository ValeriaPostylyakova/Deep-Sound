import { PaletteMode, ThemeOptions, createTheme } from '@mui/material'
import { components } from '../components/ui'
import { darkThemeConfig, lightThemeConfig } from '../configs/theme'

export const themeSettings = (mode: PaletteMode): ThemeOptions => {
	const colors = mode === 'dark' ? darkThemeConfig : lightThemeConfig

	return {
		palette: {
			mode,
			primary: {
				main: colors.primary[500],
				contrastText: colors.white.DEFAULT
			},
			background: {
				default: colors.neutral[100],
				paper: colors.tertiary[200]
			},
			text: {
				primary: colors.white.DEFAULT,
				secondary: colors.primary[800]
			},
			divider: colors.neutral[200],
			action: {
				hover: colors.primary[600],
				selected: colors.primary[700],
				disabled: colors.neutral[300]
			}
		},
		custom: {
			tokens: colors
		},
		typography: {
			fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif'
		},
		components
	}
}

export const createAppTheme = (mode: PaletteMode) =>
	createTheme(themeSettings(mode))
