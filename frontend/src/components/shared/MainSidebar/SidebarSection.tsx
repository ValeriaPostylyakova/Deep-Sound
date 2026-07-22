import { List, Typography } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
	title: string
	children: ReactNode
}

export const SidebarSection = ({ title, children }: Props) => {
	return (
		<>
			<Typography
				variant="overline"
				sx={{
					px: 2,
					mt: 1,
					mb: 1,
					letterSpacing: 2,
					color: 'text.secondary'
				}}
			>
				{title}
			</Typography>

			<List disablePadding>{children}</List>
		</>
	)
}
