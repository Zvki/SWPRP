import {UserResponse} from '../user-response';
import {ActivityType, FileActivityReference, MeetingActivityReference} from './activity.interface';

export interface ActivityNodeInterface {
  id: string,
  activityId: string,
  author: UserResponse,
  type: ActivityType,
  content?: string,
  parentReferenceId?: string,
  file?: FileActivityReference;
  meeting?: MeetingActivityReference;
  createdAt: Date,
  children: ActivityNodeInterface[]
}
