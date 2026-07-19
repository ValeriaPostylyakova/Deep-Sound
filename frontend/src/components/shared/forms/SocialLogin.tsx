import AppleIcon from '@mui/icons-material/Apple'
import GoogleIcon from '@mui/icons-material/Google'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import type { FC } from 'react'

interface Props {}

export const SocialLogin: FC<Props> = () => {
	return (
		<Stack
			direction="row"
			spacing={2}
		>
			<Button
				fullWidth
				variant="outlined"
				startIcon={<GoogleIcon />}
			>
				Google
			</Button>

			<Button
				fullWidth
				variant="outlined"
				startIcon={<AppleIcon />}
			>
				Apple
			</Button>
		</Stack>
	)
}
