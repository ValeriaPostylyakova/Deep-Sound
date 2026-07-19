'use client'

import { Box, Chip, Typography } from '@mui/material'
import AlbumCards from './AlbumCards'

export default function LeftHero() {
	return (
		<Box className="relative hidden md:flex w-[60%] overflow-hidden items-center justify-center bg-background">
			<img
				src="/auth/register/background-layer.png"
				alt=""
				className="absolute inset-0 h-full w-full object-cover"
			/>

			<div className="absolute inset-0 bg-black/40 backdrop-blur-xs" />
			<Box className="relative z-10 max-w-2xl px-12">
				<Chip
					label="Experience Premium"
					color="primary"
					className="glass uppercase tracking-[4px]"
				/>

				<Typography
					variant="h1"
					sx={{ mt: 4, fontWeight: 700 }}
				>
					Музыка, которая <br />
					<Box
						component="span"
						sx={{ color: 'primary.main' }}
					>
						чувствует {''}
					</Box>
					тебя.
				</Typography>

				<Typography sx={{ mt: 3, maxWidth: 520, color: 'text.secondary' }}>
					Присоединяйтесь к сообществу ценителей качественного звука. Playcloud
					— это не просто стриминг, а персональное музыкальное пространство.
				</Typography>

				<AlbumCards />
			</Box>
		</Box>
	)
}
