export interface ProjectRequest {
  title: string,
  description: string,
  supervisorId?: string,
  emailInvites: string[]
}
