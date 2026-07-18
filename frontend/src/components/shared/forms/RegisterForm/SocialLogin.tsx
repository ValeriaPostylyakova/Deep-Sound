import AppleIcon from '@mui/icons-material/Apple'
import GoogleIcon from '@mui/icons-material/Google'

import { Button, Stack } from '@mui/material'

export default function SocialLogin() {
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
