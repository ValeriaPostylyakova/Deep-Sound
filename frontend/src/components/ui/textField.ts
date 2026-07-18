import { Components, Theme } from '@mui/material'

export const muiTextField: Components<Theme> = {
	MuiTextField: {
		defaultProps: {
			variant: 'outlined',
			fullWidth: true,
			size: 'medium'
		}
	},
	MuiOutlinedInput: {
		styleOverrides: {
			root: ({ theme }) => ({
				borderRadius: '1rem',
				backgroundColor: theme.palette.background.paper,
				transition: theme.transitions.create(
					['border-color', 'box-shadow', 'background-color'],
					{
						duration: theme.transitions.duration.shorter
					}
				),

				'& .MuiOutlinedInput-notchedOutline': {
					borderColor: theme.palette.divider,
					borderWidth: '1px'
				},
				'&:hover .MuiOutlinedInput-notchedOutline': {
					borderColor: theme.palette.text.secondary
				},
				'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
					borderColor: theme.palette.primary.main,
					borderWidth: '2px'
				},
				'&.Mui-error .MuiOutlinedInput-notchedOutline': {
					borderColor: theme.palette.error.main
				},

				'& .MuiOutlinedInput-input': {
					padding: '0.85rem 1rem',
					fontSize: '0.9375rem',
					'&::placeholder': {
						opacity: 0.6,
						color: theme.palette.text.secondary
					}
				}
			})
		}
	},
	MuiInputLabel: {
		defaultProps: {
			shrink: true
		},
		styleOverrides: {
			root: ({ theme }) => ({
				fontSize: '0.875rem',
				color: theme.palette.text.secondary,
				transform: 'translate(14px, -9px) scale(0.75)',
				'&.Mui-focused': {
					color: theme.palette.primary.main
				},
				'&.Mui-error': {
					color: theme.palette.error.main
				}
			})
		}
	},
	MuiFormHelperText: {
		styleOverrides: {
			root: {
				marginLeft: '0.5rem',
				marginRight: '0.5rem',
				fontSize: '0.75rem',
				lineHeight: 1.25
			}
		}
	}
}
