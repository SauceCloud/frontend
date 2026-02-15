import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'
import { useSelector } from '@/app/providers/store'
import { selectCurrentUser } from '@/entities/user'
import { applyApiErrorToForm, isRtkqError } from '@/shared/api'
import { formatDateToYYYYMMDD } from '@/shared/lib/date'
import { pickDirty } from '@/shared/lib/object'
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
import { useEditProfileMutation } from '../api/editProfileApi'
import { editProfileSchema } from '../model/schema'

type Props = {
  onSucces?: () => void
}

export const EditProfileForm = ({ onSucces }: Props) => {
  const [editProfile, { isLoading }] = useEditProfileMutation()
  const [calendarOpen, setCalendarOpen] = useState(false)
  const user = useSelector(selectCurrentUser)
  const { t } = useTranslation()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: user!.username,
      description: user!.description ?? '',
      birthDate: new Date(user!.birthDate),
    },
  })

  const handleSubmit = async (data: z.infer<typeof editProfileSchema>) => {
    const dirty = form.formState.dirtyFields
    const payload = pickDirty(data, dirty)

    try {
      const edited = await editProfile({
        ...payload,
        birthDate: payload.birthDate
          ? formatDateToYYYYMMDD(payload.birthDate)
          : undefined,
      }).unwrap()

      if (edited.username != user!.username)
        navigate(`/${edited.username}`, { replace: true })

      onSucces?.()
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
      id="edit-form"
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
              <FieldLabel htmlFor="edit-username">
                {t('common:fields.username')}
              </FieldLabel>
              <Input
                {...field}
                id="edit-username"
                aria-invalid={fieldState.invalid}
                name="username"
              />

              {fieldState.invalid ? (
                <FieldError errors={[fieldState.error]} />
              ) : (
                <FieldDescription>
                  {t('common:hints.usernameChange')}
                </FieldDescription>
              )}
            </Field>
          )}
        />
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="edit-description">
                {t('common:fields.description')}
              </FieldLabel>
              <Input
                {...field}
                id="edit-description"
                aria-invalid={fieldState.invalid}
                name="description"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="birthDate"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="edit-birthDate">
                {t('common:fields.birthdate')}
              </FieldLabel>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="edit-birthDate"
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
                    selected={field.value ? new Date(field.value) : undefined}
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

        <Field className="gap-3">
          <FieldError errors={[form.formState.errors.root]} />
          <Button
            type="submit"
            form="edit-form"
            disabled={isLoading || !form.formState.isDirty}
          >
            {t('profile:edit.submit')}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
