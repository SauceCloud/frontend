import * as z from 'zod'

export const formSchema = z.object({
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
    .refine(password => /[A-Z]/.test(password), {
      message: 'validation:fields.password.PASSWORD_WEAK',
    })
    .refine(password => /[a-z]/.test(password), {
      message: 'validation:fields.password.PASSWORD_WEAK',
    })
    .refine(password => /[0-9]/.test(password), {
      message: 'validation:fields.password.PASSWORD_WEAK',
    })
    .refine(
      password => /^[-#!$@£%^&*()_+|~=`{}[\]:";'<>?,./\\ ]$/.test(password),
      {
        message: 'validation:fields.password.PASSWORD_WEAK',
      },
    ),
})
