'use client'

import NotificationsIcon from '@mui/icons-material/Notifications'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import { useState } from 'react'

import type { FC } from 'react'

interface Props {}

export const NotificationBell: FC<Props> = () => {
	const [hasNewNotifications, setHasNewNotifications] = useState<boolean>(true)

	const handleClick = (): void => {
		setHasNewNotifications(false)
	}

	return (
		<IconButton
			color="inherit"
			onClick={handleClick}
		>
			<Badge
				variant="dot"
				color="error"
				invisible={!hasNewNotifications}
			>
				<NotificationsIcon />
			</Badge>
		</IconButton>
	)
}
