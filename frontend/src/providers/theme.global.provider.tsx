'use client'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import * as React from 'react'

const theme = createTheme({
	palette: {
		primary: {
			main: '#d28219'
		}
	}
})

export default function ThemeGlobalProvider({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<AppRouterCacheProvider options={{ enableCssLayer: true }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</AppRouterCacheProvider>
	)
}
