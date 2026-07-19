import { Stack, TextField } from '@mui/material'

export default function UserFields() {
	return (
		<Stack spacing={3}>
			<TextField
				label="Электронная почта"
				type="email"
				placeholder="aleksandr@gmail.com"
				fullWidth
			/>

			<TextField
				fullWidth
				label="Пароль"
				type="password"
				placeholder="••••••••"
			/>
		</Stack>
	)
}
