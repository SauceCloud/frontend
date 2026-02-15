import * as z from 'zod'

export const registerSchema = z.object({
  username: z
    .string('validation:fields.username.USERNAME_REQUIRED')
    .min(5, 'validation:fields.username.USERNAME_MIN')
    .max(32, 'validation:fields.username.USERNAME_MAX')
    .regex(/^[a-zA-Z0-9_]+$/, 'validation:fields.username.USERNAME_PATTERN'),
  birthDate: z
    .date('validation:fields.birthDate.BIRTHDATE_REQUIRED')
    .max(new Date(), 'validation:fields.birthDate.BIRTHDATE_INVALID'),
  email: z.email({
    message: 'validation:fields.email.EMAIL_INVALID',
  }),
  password: z
    .string('validation:fields.password.PASSWORD_REQUIRED')
    .min(8, 'validation:fields.password.PASSWORD_MIN')
    .refine(
      p =>
        /[A-Z]/.test(p) &&
        /[a-z]/.test(p) &&
        /[0-9]/.test(p) &&
        /[-#!$@£%^&*()_+|~=`{}[\]:";'<>?,./\\ ]/.test(p),
      { message: 'validation:fields.password.PASSWORD_WEAK' },
    ),
})

export type RegisterDto = Omit<z.infer<typeof registerSchema>, 'birthDate'> & {
  birthDate: string
}
