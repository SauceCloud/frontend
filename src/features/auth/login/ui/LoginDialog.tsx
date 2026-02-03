import { useState, type ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'
import { LoginForm } from './LoginForm'

type Props = {
  trigger: ReactNode
}

export const LoginDialog = ({ trigger }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Вход</DialogTitle>
          <DialogDescription>
            Укажите данные от своего аккаунта
          </DialogDescription>
        </DialogHeader>
        <LoginForm onSubmit={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
