import { z } from 'zod'

export const RegisterSchema = z
	.object({
		email: z
			.string()
			.trim()
			.toLowerCase()
			.pipe(
				z.email({
					message: 'Некорректный формат почты'
				})
			),
		password: z
			.string()
			.min(8, 'Пароль должен быть не менее 8 символов')
			.regex(/[A-ZА-Я]/, 'Пароль должен содержать хотя бы одну заглавную букву')
			.regex(
				/[^A-Za-z0-9А-Яа-я]/,
				'Пароль должен содержать хотя бы один специальный символ'
			),
		role: z.enum(['listener', 'artist']),
		confirmPassword: z.string()
	})

	.superRefine(({ password, confirmPassword }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Пароли не совпадают',
				path: ['confirmPassword']
			})
		}
	})

export type TRegisterSchema = z.infer<typeof RegisterSchema>
