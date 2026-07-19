'use client'

import { PulseButton } from '@/src/components/ui'
import { PAGES } from '@/src/configs/public-pages.config'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { keyframes } from '@mui/system'
import { useRouter } from 'next/navigation'

const pulseAnimation = keyframes`
  0% {
    background-color: rgba(211, 47, 47, 0.4);
    box-shadow: 0 0 0 0 rgba(211, 47, 47, 0.4);
  }
  50% {
    background-color: rgba(211, 47, 47, 0.1);
  }
  100% {
    background-color: rgba(211, 47, 47, 0.4);
    box-shadow: 0 0 0 10px rgba(211, 47, 47, 0);
  }
`

export default function Forbidden() {
	const router = useRouter()

	return (
		<Box className="flex h-screen items-center justify-center">
			<Box className="flex flex-col items-center gap-5 max-w-1/4">
				<PulseButton
					borderColor="error.main"
					keyframes={pulseAnimation}
				>
					<LockOutlinedIcon sx={{ color: 'error.main' }} />
				</PulseButton>

				<Typography
					sx={{ textAlign: 'center' }}
					variant="h1"
				>
					Вход запрещён
				</Typography>

				<Typography
					sx={{ color: 'text.secondary', textAlign: 'center', mb: 2 }}
				>
					У вас нет прав для просмотра этой страницы. Возможно, стоит войти в
					другой аккаунт?
				</Typography>

				<Box className="flex items-center gap-4">
					<Button
						variant="contained"
						onClick={() => router.push(PAGES.HOME)}
					>
						На главную
					</Button>
					<Button
						variant="outlined"
						onClick={() => router.push(PAGES.LOGIN)}
					>
						Войти в профиль
					</Button>
				</Box>
			</Box>
		</Box>
	)
}
