export type ButtonVariantType = 'default' | 'outline' | 'link' | 'ghost' | 'destructive'

export const ButtonBase: string = "cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2"

export const ButtonVariants: Record<ButtonVariantType, string> = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
  link: 'text-foreground underline-offset-4 hover:underline',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
}
