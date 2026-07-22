import { Components, Theme } from '@mui/material'

export const muiListItemButton: Components<Theme>['MuiListItemButton'] = {
	styleOverrides: {
		root: ({ theme }) => ({
			borderRadius: 16,
			padding: '12px 16px',
			color: theme.palette.text.secondary,
			transition: 'all .2s',

			'& .MuiListItemIcon-root': {
				color: 'inherit',
				minWidth: 40
			},

			'&:hover': {
				backgroundColor: theme.palette.background.paper,
				color: theme.palette.text.primary
			},

			'&.Mui-selected': {
				backgroundColor: 'transparent',
				color: theme.palette.primary.main,
				fontWeight: 700
			},

			'&.Mui-selected:hover': {
				backgroundColor: theme.palette.background.paper
			}
		})
	}
}
