import LeftHero from '@/src/components/shared/auth/login/LeftHero'
import LoginForm from '@/src/components/shared/forms/LoginForm/LoginForm'
import type { FC } from 'react'

interface Props {}

const LoginPage: FC<Props> = () => {
	return (
		<div className="flex min-h-screen bg-background">
			<LeftHero />
			<LoginForm />
		</div>
	)
}

export default LoginPage
