import { Components, Theme } from '@mui/material'

export const muiTypography: Components<Theme>['MuiTypography'] = {
	defaultProps: {
		variant: 'body1',
		variantMapping: {
			h1: 'h1',
			h2: 'h2',
			h3: 'h3',
			h4: 'h4',
			h5: 'h5',
			h6: 'h6',
			subtitle1: 'p',
			subtitle2: 'p',
			body1: 'p',
			body2: 'p'
		}
	},
	styleOverrides: {
		root: {
			fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
			WebkitFontSmoothing: 'antialiased',
			MozOsxFontSmoothing: 'grayscale'
		},
		h1: ({ theme }) => ({
			fontSize: '2.5rem',
			fontWeight: 800,
			lineHeight: 1.2,
			letterSpacing: '-0.02em',
			textAlign: 'center'
		}),
		h2: ({ theme }) => ({
			fontSize: '2rem',
			fontWeight: 700,
			lineHeight: 1.25,
			letterSpacing: '-0.01em'
		}),
		h3: {
			fontSize: '1.2rem',
			fontWeight: 600,
			lineHeight: 1.3
		},
		body1: {
			fontSize: '1rem',
			fontWeight: 400,
			lineHeight: 1.5
		},
		body2: {
			fontSize: '0.875rem',
			fontWeight: 400,
			lineHeight: 1.5
		}
	},
	variants: [
		{
			props: { variant: 'h2', color: 'primary' },
			style: ({ theme }) => ({
				background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
				WebkitBackgroundClip: 'text',
				WebkitTextFillColor: 'transparent'
			})
		}
	]
}
