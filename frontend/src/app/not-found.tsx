'use client'

import DiscFullIcon from '@mui/icons-material/DiscFull'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { keyframes } from '@mui/system'
import { useRouter } from 'next/navigation'
import { PAGES } from '../configs/public-pages.config'

const pulseAnimation = keyframes`
  0% { background-color: rgba(255, 107, 53, 0.4); box-shadow: 0 0 0 0 rgba(255, 107, 53, 0.4); }
  50% { background-color: rgba(255, 107, 53, 0.1); }
  100% { background-color: rgba(255, 107, 53, 0.4); box-shadow: 0 0 0 10px rgba(255, 107, 53, 0); }
`

export default function NotFound() {
	const router = useRouter()

	return (
		<Box className="flex h-screen items-center justify-center">
			<Box className="flex flex-col items-center gap-5 max-w-1/4">
				<Box
					sx={{
						display: 'inline-flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: 48,
						height: 48,
						borderRadius: '50%',
						border: '2px solid',
						borderColor: 'primary.main',
						backgroundColor: 'background.paper',
						animation: `${pulseAnimation} 2s infinite ease-in-out`
					}}
				>
					<DiscFullIcon sx={{ color: 'primary.main' }} />
				</Box>
				<Typography variant="h1">Тишина не по плану</Typography>
				<Typography
					sx={{ color: 'text.secondary', textAlign: 'center', mb: 2 }}
				>
					Кажется, эта волна ушла в другом направлении. Вернемся к любимым
					трекам?
				</Typography>
				<Box className="flex items-center gap-4">
					<Button onClick={() => router.push(PAGES.HOME)}>На главную</Button>
					<Button
						variant="outlined"
						onClick={() => router.push(PAGES.HOME)}
					>
						Поиск музыки
					</Button>
				</Box>
			</Box>
		</Box>
	)
}
