export interface UserData {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  role: UserRole
}

enum UserRole {
  STUDENT,
  SUPERVISOR
}
