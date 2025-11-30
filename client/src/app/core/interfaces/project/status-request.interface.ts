import {ProjectStatus} from './project-response';

export interface StatusRequest {
  status: ProjectStatus,
  id: string
}
