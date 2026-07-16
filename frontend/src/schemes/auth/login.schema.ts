import { z } from 'zod'

export const LoginSchema = z.object({
	email: z
		.string()
		.trim()
		.toLowerCase()
		.pipe(z.email({ message: 'Некорректный формат почты' })),

	password: z.string().min(8, 'Неверный пароль')
})

export type TLoginSchema = z.infer<typeof LoginSchema>
