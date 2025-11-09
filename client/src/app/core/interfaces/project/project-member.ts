import {UserResponse} from '../user-response';

export interface ProjectMember {
  id: string,
  student?: UserResponse,
  studentEmail: string;
  status: MembershipStatus,
}

export enum MembershipStatus {
  PENDING,
  ACCEPTED,
  REJECTED
}
