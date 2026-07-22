import { Components, Theme } from '@mui/material'

export const muiDrawer: Components<Theme>['MuiDrawer'] = {
	styleOverrides: {
		paper: ({ theme }) => ({
			background: theme.palette.background.default,
			borderRight: `1px solid ${theme.palette.divider}`
		})
	}
}
