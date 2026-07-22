import { api } from '../api/client.api'
import {
	TChangePasswordSchema,
	TLoginSchema,
	TRegisterSchema,
	TResetPasswordSchema
} from '../schemes'

class AuthService {
	public async register(data: TRegisterSchema) {
		return api.post('/auth/register', data)
	}

	public async login(data: TLoginSchema) {
		return api.post('/auth/login', data)
	}

	public async logout() {
		return api.post('/auth/logout')
	}

	public async refresh() {
		return api.post('/auth/token/refresh')
	}

	public async forgotPassword(email: string) {
		return api.post('/auth/forgot-password', { email })
	}

	public async resetPassword(data: TResetPasswordSchema) {
		return api.post('/auth/reset-password', data)
	}

	public async changePassword(data: TChangePasswordSchema) {
		return api.post('/auth/change-password', data)
	}

	public async verifyEmail(token: string) {
		return api.post('/auth/verify-email', { token })
	}
}

export const authService = new AuthService()
