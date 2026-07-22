import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { FC } from 'react'
import { NotificationBell } from '../ui'
import { Search } from './Search'

interface Props {}

export const Header: FC<Props> = () => {
	return (
		<Box
			className="realtive w-full py-3 px-4 flex items-center justify-between gap-10"
			component="header"
		>
			<Search />
			<div className="flex items-center gap-5">
				<NotificationBell />
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 2,
						width: 'fit-content'
					}}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-end'
						}}
					>
						<Typography className="text-nowrap">
							Сандро Таварткиладзе
						</Typography>
						<Typography>PRO АККАУНТ</Typography>
					</Box>
					<Avatar
						alt="Сандро Таварткиладзе"
						src="path_to_your_avatar_image.jpg"
						sx={{
							width: 48,
							height: 48,
							border: '2px solid rgba(255, 255, 255, 0.2)'
						}}
					/>
				</Box>
			</div>
		</Box>
	)
}
