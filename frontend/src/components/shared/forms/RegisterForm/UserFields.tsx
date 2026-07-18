import EmailIcon from '@mui/icons-material/Email'
import PersonIcon from '@mui/icons-material/Person'

import { InputAdornment, Stack, TextField } from '@mui/material'

export default function UserFields() {
	return (
		<Stack spacing={3}>
			<TextField
				label="Имя пользователя"
				placeholder="Александр Александров"
				fullWidth
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<PersonIcon sx={{ color: 'text.secondary' }} />
							</InputAdornment>
						)
					}
				}}
			/>

			<TextField
				label="Email"
				type="email"
				placeholder="example@gmail.com"
				fullWidth
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<EmailIcon sx={{ color: 'text.secondary' }} />
							</InputAdornment>
						)
					}
				}}
			/>
		</Stack>
	)
}
