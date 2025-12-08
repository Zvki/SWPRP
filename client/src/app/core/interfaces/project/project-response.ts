import {UserResponse} from '../user-response';
import {ProjectMember} from './project-member';

export interface GroupedProjects {
  ACTIVE: ProjectResponse[],
  PENDING: ProjectResponse[]
  FINISHED: ProjectResponse[]
}

export interface ProjectResponse {
  id: string,
  title: string,
  description: string,
  members: ProjectMember[],
  status: ProjectStatus,
  supervisor: UserResponse,
  links: string[]
}

export enum ProjectStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED"
}

export const ProjectStatusStyling: Record<ProjectStatus, string> = {
  [ProjectStatus.ACTIVE]: 'bg-green-100 text-green-800',
  [ProjectStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
  [ProjectStatus.FINISHED]: 'bg-red-100 text-red-800'
}

export const ProjectStatusLabel: Record<ProjectStatus, string> = {
  [ProjectStatus.ACTIVE]: 'Aktywny',
  [ProjectStatus.PENDING]: 'Oczekujący',
  [ProjectStatus.FINISHED]: 'Zakończony',
}
