import MusicNoteIcon from '@mui/icons-material/MusicNote'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import type { FC } from 'react'

interface Props {
	fontSize?: number
	mb?: number
}

export const Logo: FC<Props> = ({ fontSize, mb }) => {
	return (
		<Box className={`flex items-center gap-3 mb-${mb ?? 0}`}>
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
				sx={{ fontWeight: 800, fontSize: fontSize ?? '' }}
			>
				PlayCloud
			</Typography>
		</Box>
	)
}
