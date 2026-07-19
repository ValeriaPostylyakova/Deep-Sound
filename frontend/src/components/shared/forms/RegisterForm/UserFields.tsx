import EmailIcon from '@mui/icons-material/Email'
import PersonIcon from '@mui/icons-material/Person'

import InputAdornment from '@mui/material/InputAdornment'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

import type { FC } from 'react'

interface Props {}

export const UserFields: FC<Props> = () => {
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
				placeholder="aleksandr@gmail.com"
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
