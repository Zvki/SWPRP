import {FileStatus} from './activity.interface';

export interface FileStatusRequest {
  activityId: string,
  status: FileStatus
}
