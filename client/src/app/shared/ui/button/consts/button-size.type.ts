export type ButtonSizeType = 'default' | 'icon' | 'lg' | 'md' | 'sm'

export const ButtonSizes: Record<ButtonSizeType, string> = {
  default: 'h-10 px-4 py-2',
  md: 'h-10 px-4 py-2',
  sm: 'h-9 rounded-md px-3',
  lg: 'h-11 rounded-md px-8',
  icon: 'h-10 w-10'
}
