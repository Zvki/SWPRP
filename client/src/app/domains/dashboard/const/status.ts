export type Status = 'success' | 'danger' | 'in-progress';

export const StatusStyling: Record<Status, string> = {
  success: 'bg-green-100 text-green-800',
  danger: 'bg-red-100 text-red-800',
  'in-progress': 'bg-blue-100 text-blue-800',
}

export const StatusLabel: Record<Status, string> = {
  success: 'Zakończony',
  danger: 'Zagrożony',
  'in-progress': 'W toku',
}
