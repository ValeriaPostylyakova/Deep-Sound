import z from 'zod'

export const ChangePasswordSchema = z.object({
	old_password: z
		.string()
		.min(8, 'Пароль должен быть не менее 8 символов')
		.regex(/[A-ZА-Я]/, 'Пароль должен содержать хотя бы одну заглавную букву')
		.regex(
			/[^A-Za-z0-9А-Яа-я]/,
			'Пароль должен содержать хотя бы один специальный символ'
		),
	password: z
		.string()
		.min(8, 'Пароль должен быть не менее 8 символов')
		.regex(/[A-ZА-Я]/, 'Пароль должен содержать хотя бы одну заглавную букву')
		.regex(
			/[^A-Za-z0-9А-Яа-я]/,
			'Пароль должен содержать хотя бы один специальный символ'
		)
})

export type TChangePasswordSchema = z.infer<typeof ChangePasswordSchema>
