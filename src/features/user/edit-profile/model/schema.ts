import * as z from 'zod'

export const editProfileSchema = z.object({
  username: z
    .string('validation:fields.username.USERNAME_REQUIRED')
    .min(5, 'validation:fields.username.USERNAME_MIN')
    .max(32, 'validation:fields.username.USERNAME_MAX')
    .regex(/^[a-zA-Z0-9_]+$/, 'validation:fields.username.USERNAME_PATTERN')
    .optional(),
  birthDate: z
    .date('validation:fields.birthDate.BIRTHDATE_REQUIRED')
    .max(new Date(), 'validation:fields.birthDate.BIRTHDATE_INVALID')
    .optional(),
  description: z
    .string()
    .max(160, 'validation:fields.description.DESCRIPTION_MAX')
    .optional(),
})

export type EditProfileFormValues = z.infer<typeof editProfileSchema>

export type EditProfileDto = Omit<
  z.infer<typeof editProfileSchema>,
  'birthDate'
> & {
  birthDate?: string
}
