import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { applyApiErrorToForm, isRtkqError } from '@/shared/api'
import { Button } from '@/shared/ui/button'
import { DialogFooter } from '@/shared/ui/dialog'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'
import { useLoginMutation } from '../../api/authApi'
import { formSchema } from '../model/schema'

type Props = {
  onSubmit: () => void
}

export const LoginForm = ({ onSubmit }: Props) => {
  const [login, { isLoading }] = useLoginMutation()

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
    } catch (err) {
      if (!isRtkqError(err)) {
        form.setError('root', {
          type: 'server',
          message: 'auth:errors.INTERNAL_ERROR',
        })
        return
      }
      applyApiErrorToForm(form, err.data)
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
              <FieldLabel htmlFor="login-email">Почта</FieldLabel>
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
              <FieldLabel htmlFor="login-password">Пароль</FieldLabel>
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
      </FieldGroup>

      <FieldError errors={[form.formState.errors.root]} />

      <DialogFooter>
        <Button type="submit" form="login-form" disabled={isLoading}>
          Войти
        </Button>
      </DialogFooter>
    </form>
  )
}
