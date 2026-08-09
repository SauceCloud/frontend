import * as React from 'react'
import { cn } from '../lib/utils'

type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'p'
  | 'blockquote'
  | 'ul'
  | 'inlineCode'
  | 'lead'
  | 'large'
  | 'small'
  | 'muted'

const styles: Record<TypographyVariant, string> = {
  h1: 'scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance',
  h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
  h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
  h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
  p: 'leading-7 ',
  blockquote: 'mt-6 border-l-2 pl-6 italic',
  ul: 'my-6 ml-6 list-disc [&>li]:mt-2',
  inlineCode:
    'bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
  lead: 'text-muted-foreground text-xl',
  large: 'text-lg font-semibold',
  small: 'text-sm leading-none font-medium',
  muted: 'text-muted-foreground text-sm',
}

const elementByVariant: Record<TypographyVariant, React.ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  p: 'p',
  blockquote: 'blockquote',
  ul: 'ul',
  inlineCode: 'code',
  lead: 'p',
  large: 'div',
  small: 'small',
  muted: 'p',
}

type TypographyProps<T extends React.ElementType> = {
  as?: T
  variant: TypographyVariant
  className?: string
  children: React.ReactNode
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

function Typography<T extends React.ElementType = 'p'>({
  as,
  variant,
  className,
  children,
  ...props
}: TypographyProps<T>) {
  const Comp = (as ?? elementByVariant[variant]) as React.ElementType
  return (
    <Comp className={cn(styles[variant], className)} {...props}>
      {children}
    </Comp>
  )
}

export { Typography, type TypographyVariant }
