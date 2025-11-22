import {UserResponse} from '../user-response';

export interface ActivityList {
  activities: ActivityResponse[],
}

export interface ActivityResponse {
  id: string,
  projectId: string,
  createdAt: Date,
  reference: ActivityReference
}

export interface ActivityReference {
  id: string,
  author: UserResponse,
  type: ActivityType,
  data: CommentActivityReference | FileActivityReference
}

export interface CommentActivityReference {
  content: string,
  parentReferenceId?: string
}

export interface FileActivityReference {
  name: string,
  content: string,
  url: string
}

export enum ActivityType {
  COMMENT = "COMMENT",
  FILE = "FILE"
}
