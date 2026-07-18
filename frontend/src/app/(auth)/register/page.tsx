import LeftHero from '@/src/components/shared/auth/register/LeftHero'
import RegisterForm from '@/src/components/shared/forms/RegisterForm/RegisterForm'

export default function RegisterPage() {
	return (
		<div className="flex min-h-screen bg-background">
			<LeftHero />
			<RegisterForm />
		</div>
	)
}
