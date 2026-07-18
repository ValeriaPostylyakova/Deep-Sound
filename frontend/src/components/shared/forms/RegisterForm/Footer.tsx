import { PAGES } from '@/src/configs/public-pages.config'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'

export default function Footer() {
	return (
		<Box className="text-center mt-4 flex items-center gap-2 justify-center">
			<Typography
				color="text.secondary"
				sx={{ color: 'text.secondary' }}
			>
				Уже есть аккаунт?
			</Typography>
			<Link href={PAGES.LOGIN}>Войти</Link>
		</Box>
	)
}
