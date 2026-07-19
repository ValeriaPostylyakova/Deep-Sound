import { Components, Theme } from '@mui/material'

export const muiToggleButton: Components<Theme>['MuiToggleButton'] = {
	defaultProps: {},
	styleOverrides: {
		root: ({ theme }) => ({
			padding: '0.4rem 1rem',
			fontSize: '0.875rem',
			fontWeight: 500,
			textTransform: 'none',
			border: `1px solid ${theme.palette.text.secondary}`,
			color: theme.palette.text.secondary,
			backgroundColor: 'transparent',

			transition: theme.transitions.create(
				['background-color', 'color', 'border-color', 'box-shadow'],
				{
					duration: theme.transitions.duration.shorter
				}
			),
			'&:hover': {
				color: theme.palette.text.primary
			},
			'&.Mui-selected': {
				color: theme.palette.primary.contrastText,
				borderColor: theme.palette.text.secondary,
				fontWeight: 600
			},
			'&.Mui-disabled': {
				color: theme.palette.action.disabled
			}
		}),
		sizeSmall: {
			padding: '0.25rem 0.75rem',
			fontSize: '0.5rem'
		},
		sizeLarge: {
			padding: '0.6rem 1.25rem',
			fontSize: '0.75rem'
		}
	}
}
