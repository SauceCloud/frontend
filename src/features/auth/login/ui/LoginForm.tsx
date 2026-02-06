import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as z from 'zod'
import { applyApiErrorToForm, isRtkqError } from '@/shared/api'
import { Button } from '@/shared/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'
import { useLoginMutation } from '../../api/authApi'
import { formSchema } from '../model/schema'

type Props = {
  onSubmit: () => void
}

export const LoginForm = ({ onSubmit }: Props) => {
  const [login, { isLoading }] = useLoginMutation()
  const { t } = useTranslation('auth')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await login(data).unwrap()
      onSubmit()
    } catch (error) {
      if (!isRtkqError(error)) {
        form.setError('root', {
          type: 'server',
          message: 'auth:errors.INTERNAL_ERROR',
        })
        return
      }
      applyApiErrorToForm(form, error.data)
    }
  }

  return (
    <form
      id="login-form"
      onSubmit={form.handleSubmit(handleSubmit)}
      className="grid gap-3"
      noValidate
    >
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="login-email">{t('login.email')}</FieldLabel>
              <Input
                {...field}
                id="login-email"
                aria-invalid={fieldState.invalid}
                type="email"
                autoComplete="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="login-password">
                {t('login.password')}
              </FieldLabel>
              <Input
                {...field}
                id="login-password"
                aria-invalid={fieldState.invalid}
                type="password"
                autoComplete="current-password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field className="gap-3">
          <FieldError errors={[form.formState.errors.root]} />
          <Button type="submit" form="login-form" disabled={isLoading}>
            {t('login.submit')}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
