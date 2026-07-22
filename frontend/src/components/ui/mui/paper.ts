import { Components, Theme } from '@mui/material'

export const muiPaper: Components<Theme>['MuiPaper'] = {
	styleOverrides: {
		rounded: ({ theme }) => ({
			borderRadius: 24,
			border: `1px solid ${theme.palette.divider}`,
			backgroundColor: theme.palette.background.paper
		})
	}
}
