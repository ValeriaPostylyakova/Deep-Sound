'use client'

import { Box, Button, Divider, Typography } from '@mui/material'
import { useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import PasswordFields from './PasswordFields'
import RoleSelector from './RoleSelector'
import SocialLogin from './SocialLogin'
import UserFields from './UserFields'

export default function RegisterForm() {
	const [role, setRole] = useState('listener')

	return (
		<Box className="flex w-full flex-col overflow-y-auto px-8 py-12 md:w-[40%] lg:px-12">
			<Header />

			<Box className="mx-auto w-full max-w-md">
				<Typography
					variant="h2"
					sx={{ mb: 1 }}
				>
					Создать аккаунт
				</Typography>

				<Typography sx={{ mb: 5, color: 'text.secondary' }}>
					Начните свое музыкальное путешествие за считанные секунды.
				</Typography>

				<Box
					component="form"
					className="space-y-6"
				>
					<UserFields />

					<PasswordFields />

					<RoleSelector
						value={role}
						onChange={setRole}
					/>

					<Button
						fullWidth
						size="large"
						variant="contained"
						sx={{ py: 1 }}
					>
						Зарегистрироваться
					</Button>

					<Divider sx={{ py: 1, color: 'text.secondary' }}>или</Divider>

					<SocialLogin />

					<Footer />
				</Box>
			</Box>
		</Box>
	)
}
