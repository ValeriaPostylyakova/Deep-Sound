'use client'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import CssBaseline from '@mui/material/CssBaseline'
import { PaletteMode, ThemeProvider } from '@mui/material/styles'
import * as React from 'react'
import { createAppTheme } from '../theme/theme'

export default function ThemeGlobalProvider({
	children
}: {
	children: React.ReactNode
}) {
	const [mode, setMode] = React.useState<PaletteMode>('dark')

	const theme = React.useMemo(() => createAppTheme(mode), [mode])

	return (
		<AppRouterCacheProvider options={{ enableCssLayer: true }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</AppRouterCacheProvider>
	)
}
