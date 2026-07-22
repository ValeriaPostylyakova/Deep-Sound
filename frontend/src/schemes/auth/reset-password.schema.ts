import z from 'zod'

export const ResetPasswordSchema = z.object({
	token: z.string(),
	password: z
		.string()
		.min(8, 'Пароль должен быть не менее 8 символов')
		.regex(/[A-ZА-Я]/, 'Пароль должен содержать хотя бы одну заглавную букву')
		.regex(
			/[^A-Za-z0-9А-Яа-я]/,
			'Пароль должен содержать хотя бы один специальный символ'
		)
})

export type TResetPasswordSchema = z.infer<typeof ResetPasswordSchema>
