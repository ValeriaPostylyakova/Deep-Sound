import { api } from '../api/client.api'
import { TLoginSchema, TRegisterSchema } from '../schemes'

class AuthService {
	public async register(data: TRegisterSchema) {
		return api.post('/auth/register', data)
	}

	public async login(data: TLoginSchema) {
		return api.post('/auth/login', data)
	}

	public async logout(token: string) {
		return api.post('/auth/logout', token)
	}

	public async refresh(token: string) {
		return api.post('/auth/refresh', token)
	}
}

export const authService = new AuthService()
