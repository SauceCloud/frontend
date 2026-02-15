import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'
import { applyApiErrorToForm, isRtkqError } from '@/shared/api'
import { formatDateToYYYYMMDD } from '@/shared/lib/date'
import { Button } from '@/shared/ui/button'
import { Calendar } from '@/shared/ui/calendar'
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
import { registerSchema } from '../model/schema'

export const RegisterForm = () => {
  const [register, { isLoading }] = useRegisterMutation()
  const [calendarOpen, setCalendarOpen] = useState(false)
  const { t } = useTranslation()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  const handleSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      await register({
        ...data,
        birthDate: formatDateToYYYYMMDD(data.birthDate),
      }).unwrap()
      navigate('/', { replace: true })
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
                {t('common:fields.username')}
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
                <FieldDescription>
                  {t('common:hints.usernameUnique')}
                </FieldDescription>
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
                {t('common:fields.birthdate')}
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
                      : t('common:placeholders.pickDate')}
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
              <FieldLabel htmlFor="register-email">
                {t('common:fields.email')}
              </FieldLabel>
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
              <FieldLabel htmlFor="register-password">
                {t('common:fields.password')}
              </FieldLabel>
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

        <Field className="gap-3">
          <FieldError errors={[form.formState.errors.root]} />
          <Button type="submit" form="register-form" disabled={isLoading}>
            {t('auth:register.submit')}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
