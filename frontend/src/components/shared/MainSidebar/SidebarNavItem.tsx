import { ReactNode } from 'react'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

interface Props {
	icon: ReactNode
	label: string
	active?: boolean
}

export const SidebarNavItem = ({ icon, label, active }: Props) => {
	return (
		<ListItemButton selected={active}>
			<ListItemIcon>{icon}</ListItemIcon>

			<ListItemText primary={label} />
		</ListItemButton>
	)
}
