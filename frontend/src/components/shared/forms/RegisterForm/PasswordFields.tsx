import TextField from '@mui/material/TextField'

import type { FC } from 'react'

interface Props {}

export const PasswordFields: FC<Props> = () => {
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
