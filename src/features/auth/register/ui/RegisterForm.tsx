import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { applyApiErrorToForm, isRtkqError } from '@/shared/api'
import { Button } from '@/shared/ui/button'
import { Calendar } from '@/shared/ui/calendar'
import { DialogFooter } from '@/shared/ui/dialog'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { useRegisterMutation } from '../../api/authApi'
import { formSchema } from '../model/schema'

type Props = {
  onSubmit: () => void
}

export const RegisterForm = ({ onSubmit }: Props) => {
  const [register, { isLoading }] = useRegisterMutation()
  const [calendarOpen, setCalendarOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const { username, birthDate, email, password } = data

    try {
      await register({
        username,
        birthDate: birthDate.toISOString(),
        email,
        password,
      }).unwrap()
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
      id="register-form"
      onSubmit={form.handleSubmit(handleSubmit)}
      className="grid gap-3"
      noValidate
    >
      <FieldGroup>
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="register-username">
                Имя пользователя
              </FieldLabel>
              <Input
                {...field}
                id="register-username"
                aria-invalid={fieldState.invalid}
                name="username"
              />

              {fieldState.invalid ? (
                <FieldError errors={[fieldState.error]} />
              ) : (
                <FieldDescription>Введите уникальное значение</FieldDescription>
              )}
            </Field>
          )}
        />

        <Controller
          name="birthDate"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="register-birthDate">
                Дата рождения
              </FieldLabel>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="register-birthDate"
                    className="w-48 justify-between font-normal"
                    type="button"
                  >
                    {field.value
                      ? new Date(field.value).toLocaleDateString()
                      : 'Выбрать дату'}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>

                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={field.value ?? undefined}
                    captionLayout="dropdown"
                    onSelect={d => {
                      field.onChange(d)
                      setCalendarOpen(false)
                    }}
                  />
                </PopoverContent>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Popover>
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="register-email">Почта</FieldLabel>
              <Input
                {...field}
                id="register-email"
                aria-invalid={fieldState.invalid}
                type="email"
                name="email"
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
              <FieldLabel htmlFor="register-password">Пароль</FieldLabel>
              <Input
                {...field}
                id="register-password"
                aria-invalid={fieldState.invalid}
                type="password"
                name="password"
                autoComplete="current-password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <FieldError errors={[form.formState.errors.root]} />

      <DialogFooter>
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Очистить
        </Button>
        <Button type="submit" form="register-form" disabled={isLoading}>
          Зарегистрироваться
        </Button>
      </DialogFooter>
    </form>
  )
}
