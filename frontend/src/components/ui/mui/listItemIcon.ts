import { Components, Theme } from '@mui/material'

export const muiListItemIcon: Components<Theme>['MuiListItemIcon'] = {
	styleOverrides: {
		root: ({ theme }) => ({
			color: theme.palette.text.secondary,
			minWidth: 40
		})
	}
}
