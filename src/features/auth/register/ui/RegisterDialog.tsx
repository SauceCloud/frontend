import { useState, type ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'
import { RegisterForm } from './RegisterForm'

type Props = {
  trigger: ReactNode
}

export const RegisterDialog = ({ trigger }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Регистрация</DialogTitle>
          <DialogDescription>Расскажи немного о себе</DialogDescription>
        </DialogHeader>
        <RegisterForm onSubmit={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
