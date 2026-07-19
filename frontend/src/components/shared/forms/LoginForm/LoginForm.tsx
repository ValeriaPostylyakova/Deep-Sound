'use client'

import { Box, Button, Typography } from '@mui/material'

import { PAGES } from '@/src/configs/public-pages.config'
import { DividerWithText } from '../DividerWithText'
import { Footer } from '../Footer'
import Header from '../Header'
import SocialLogin from '../SocialLogin'
import UserFields from './UserFields'

export default function LoginForm() {
	return (
		<Box className="flex w-full flex-col overflow-y-auto px-8 py-12 md:w-[40%] lg:px-12">
			<Header />

			<Box className="mx-auto w-full max-w-md">
				<Typography
					variant="h2"
					sx={{ mb: 1 }}
				>
					С возвращением
				</Typography>

				<Typography sx={{ mb: 5, color: 'text.secondary' }}>
					Введите свои данные для входа в аккаунт
				</Typography>

				<Box
					component="form"
					className="space-y-6"
				>
					<UserFields />

					<Button
						fullWidth
						size="large"
						variant="contained"
						sx={{ py: 1 }}
					>
						Войти
					</Button>

					<DividerWithText />

					<SocialLogin />

					<Footer
						text="Нет аккаунта?"
						linkUrl={PAGES.REGISTER}
						linkText="Зарегистрироваться"
					/>
				</Box>
			</Box>
		</Box>
	)
}
