import { Components, Theme } from '@mui/material'

export const muiButton: Components<Theme>['MuiButton'] = {
	defaultProps: {
		variant: 'contained',
		color: 'primary'
	},
	styleOverrides: {
		root: ({ theme }) => ({
			borderRadius: '1rem',
			textTransform: 'none',
			fontWeight: 600,
			padding: '0.6rem 1.4rem',
			color: theme.palette.primary.contrastText
		})
	},
	variants: [
		{
			props: { variant: 'contained' },
			style: ({ theme }) => ({
				'&:hover': { backgroundColor: theme.palette.action.hover },
				'&:active': { backgroundColor: theme.palette.action.selected }
			})
		},
		{
			props: { variant: 'outlined' },
			style: ({ theme }) => ({
				borderColor: theme.palette.divider,
				'&:hover': { borderColor: theme.palette.text.secondary }
			})
		}
	]
}
