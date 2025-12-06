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
  content?: string,
  author: UserResponse,
  type: ActivityType,
  data: CommentActivityReference | FileActivityReference | MeetingActivityReference
}

export interface CommentActivityReference {
  parentReferenceId?: string
}

export interface FileActivityReference {
  originalName: string,
  name: string,
  url: string,
  status: FileStatus
}

export interface MeetingActivityReference {
  title: string,
  url: string
  date: Date
}

export enum ActivityType {
  COMMENT = "COMMENT",
  FILE = "FILE",
  MEETING = "MEETING"
}

export enum FileStatus {
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  COMPLETED = 'COMPLETED'
}
