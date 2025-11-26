export interface UserResponse {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  role: UserRole
}

export enum UserRole {
  STUDENT = 'STUDENT',
  SUPERVISOR = 'SUPERVISOR'
}
