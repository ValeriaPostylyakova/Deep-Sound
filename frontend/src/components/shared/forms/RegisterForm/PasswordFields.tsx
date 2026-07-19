import { TextField } from '@mui/material'

export default function PasswordFields() {
	return (
		<div className="flex w-full gap-3">
			<TextField
				fullWidth
				label="Пароль"
				type="password"
				placeholder="••••••••"
			/>
			<TextField
				fullWidth
				label="Повторите пароль"
				type="password"
				placeholder="••••••••"
			/>
		</div>
	)
}
