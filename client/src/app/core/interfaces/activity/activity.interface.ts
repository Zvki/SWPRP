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

export const FileStatusStyling: Record<FileStatus, string> = {
  [FileStatus.COMPLETED]: 'bg-green-100 text-green-800',
  [FileStatus.UNDER_REVIEW]: 'bg-yellow-100 text-yellow-800',
  [FileStatus.PENDING]: 'bg-red-100 text-red-800'
}

export const FileStatusLabel: Record<FileStatus, string> = {
  [FileStatus.UNDER_REVIEW]: 'Rozpatrywany',
  [FileStatus.PENDING]: 'Oczekujący',
  [FileStatus.COMPLETED]: 'Zakończony',
}
