import { Components, Theme } from '@mui/material'

export const muiToggleButtonGroup: Components<Theme>['MuiToggleButtonGroup'] = {
	defaultProps: {
		size: 'medium',
		exclusive: true
	},
	styleOverrides: {
		root: ({ theme }) => ({
			borderRadius: '1rem',
			backgroundColor: 'transparent',
			border: `1px solid ${theme.palette.divider}`,
			padding: '2px',
			gap: '2px',
			'& .MuiToggleButtonGroup-grouped': {
				border: '1px solid transparent',
				borderRadius: 'calc(1rem - 2px)',

				'&:not(:first-of-type)': {
					marginLeft: 0
				}
			}
		}),
		vertical: {
			flexDirection: 'column',
			'& .MuiToggleButtonGroup-grouped': {
				'&:not(:first-of-type)': {
					marginTop: 0
				}
			}
		}
	}
}
