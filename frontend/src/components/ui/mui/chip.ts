import { Components, Theme } from '@mui/material'

export const muiChip: Components<Theme>['MuiChip'] = {
	defaultProps: {
		variant: 'filled',
		color: 'default',
		size: 'medium'
	},
	styleOverrides: {
		root: ({ theme }) => ({
			borderRadius: '1rem',
			fontWeight: 500,
			letterSpacing: '0.04em',
			fontSize: '0.8125rem',
			textTransform: 'uppercase',
			transition: theme.transitions.create(
				['background-color', 'box-shadow', 'border-color'],
				{
					duration: theme.transitions.duration.shorter
				}
			)
		}),
		label: {
			paddingLeft: '1rem',
			paddingRight: '1rem'
		},
		sizeSmall: {
			fontSize: '0.75rem',
			borderRadius: '0.375rem'
		}
	},
	variants: [
		{
			props: { variant: 'outlined', color: 'primary' },
			style: ({ theme }) => ({
				backgroundColor: 'rgba(255, 255, 255, 0.05)',
				backdropFilter: 'blur(8px)',
				borderColor: 'rgba(255, 255, 255, 0.1)',
				color: theme.palette.text.primary,
				'&:hover': {
					backgroundColor: 'rgba(255, 255, 255, 0.1)',
					borderColor: 'rgba(255, 255, 255, 0.2)'
				}
			})
		},
		{
			props: { variant: 'filled', color: 'default' },
			style: ({ theme }) => ({
				backgroundColor: theme.palette.action.hover,
				color: theme.palette.text.primary,
				'&:hover': {
					backgroundColor: theme.palette.action.selected
				}
			})
		}
	]
}
