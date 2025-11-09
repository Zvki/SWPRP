import {UserResponse} from '../user-response';
import {ProjectMember} from './project-member';

export interface ProjectResponse {
  id: string,
  title: string,
  description: string,
  members: ProjectMember[],
  status: ProjectStatus,
  supervisor: UserResponse
}

export enum ProjectStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE"
}

export const ProjectStatusStyling: Record<ProjectStatus, string> = {
  [ProjectStatus.ACTIVE]: 'bg-green-100 text-green-800',
  [ProjectStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
}

export const ProjectStatusLabel: Record<ProjectStatus, string> = {
  [ProjectStatus.ACTIVE]: 'Aktywny',
  [ProjectStatus.PENDING]: 'Oczekujący',
}
