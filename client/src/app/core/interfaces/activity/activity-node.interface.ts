import {UserResponse} from '../user-response';
import {ActivityType, FileActivityReference} from './activity.interface';

export interface ActivityNodeInterface {
  id: string,
  activityId: string,
  author: UserResponse,
  type: ActivityType,
  content?: string,
  parentReferenceId?: string,
  file?: FileActivityReference;
  createdAt: Date,
  children: ActivityNodeInterface[]
}
