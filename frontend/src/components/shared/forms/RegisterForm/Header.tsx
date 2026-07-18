import MusicNoteIcon from '@mui/icons-material/MusicNote'
import { Box, Typography } from '@mui/material'

export default function Header() {
	return (
		<Box className="mb-16 flex items-center justify-between">
			<Box className="flex items-center gap-3">
				<Box
					sx={{
						bgcolor: 'primary.main'
					}}
					className="flex h-10 w-10 items-center justify-center rounded-xl"
				>
					<MusicNoteIcon />
				</Box>

				<Typography
					variant="h6"
					sx={{ fontWeight: 800 }}
				>
					PlayCloud
				</Typography>
			</Box>
		</Box>
	)
}
