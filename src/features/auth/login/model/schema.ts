import * as z from 'zod'

export const formSchema = z.object({
  email: z.email({
    message: 'validation:fields.email.EMAIL_INVALID',
  }),
  password: z
    .string('validation:fields.password.PASSWORD_REQUIRED')
    .min(8, 'validation:fields.password.PASSWORD_MIN'),
})
