import { Grid, TextField } from '@mui/material'

export default function PasswordFields() {
	return (
		<Grid
			container
			spacing={2}
		>
			<Grid size={6}>
				<TextField
					fullWidth
					label="Пароль"
					type="password"
					placeholder="••••••••"
				/>
			</Grid>

			<Grid size={6}>
				<TextField
					fullWidth
					label="Повторите"
					type="password"
					placeholder="••••••••"
				/>
			</Grid>
		</Grid>
	)
}
