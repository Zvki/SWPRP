import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  ActivityList,
  ActivityResponse,
  ActivityType,
  CommentActivityReference,
  FileActivityReference, MeetingActivityReference
} from '../../interfaces/activity/activity.interface';
import {ActivityNodeInterface} from '../../interfaces/activity/activity-node.interface';
import {CommentRequest} from '../../interfaces/activity/comment-request.interface';
import {MeetingRequest} from '../../interfaces/activity/meeting-request.interface';
import {FileRequest} from '../../interfaces/activity/file-request.interface';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private API_URL = 'http://localhost:4200/swprp/activity'
  activityTree = signal<ActivityNodeInterface[]>([]);
  filesTree = signal<ActivityNodeInterface[]>([]);
  meetingTree = signal<ActivityNodeInterface[]>([]);

  private readonly http = inject(HttpClient);

  public loadActivities(projectId: string): void {
    this.http.get<ActivityList>(`${this.API_URL}/${projectId}`)
      .subscribe({
        next: res => this.activityTree.set(this.buildTree(res.activities)),
        error: err => {
          console.error('Error loading activities', err);
          this.activityTree.set([]);
        }
      });
  }

  public loadFiles(projectId: string): void {
    this.http.get<ActivityList>(`${this.API_URL}/${projectId}/files`)
      .subscribe({
        next: res => this.filesTree.set(this.buildTree(res.activities)),
        error: err => {
          console.error('Error loading files', err);
          this.filesTree.set([]);
        }
      });
  }

  public loadMeetings(projectId: string): void {
    this.http.get<ActivityList>(`${this.API_URL}/${projectId}/meetings`)
      .subscribe({
        next: res => this.meetingTree.set(this.buildTree(res.activities)),
        error: err => {
          console.error('Error loading meetings', err);
          this.meetingTree.set([]);
        }
      });
  }

  public addComment(data: CommentRequest): void {
    this.http.post(`${this.API_URL}/comment`, data)
      .subscribe({
        next: () => this.refreshActivities(data.projectId),
        error: err => console.error('Error adding comment', err)
      });
  }

  public addFile(data: FileRequest): void {
    const formData = new FormData();
    formData.append('projectId', data.projectId);
    formData.append('file', data.file);
    formData.append('content', data.content);

    this.http.post(`${this.API_URL}/file`, formData)
      .subscribe({
        next: () => this.refreshActivities(data.projectId),
        error: err => console.error('Error adding file', err)
      });
  }

  public addMeeting(data: MeetingRequest): void {
    this.http.post(`${this.API_URL}/meeting`, data)
    .subscribe({
      next: () => this.refreshActivities(data.projectId),
      error: err => console.error('Error adding meeting', err)
    });
  }

  public refreshActivities(projectId: string): void {
    this.loadActivities(projectId);
    this.loadFiles(projectId);
    this.loadMeetings(projectId);
  }


  private buildTree(activities: ActivityResponse[]): ActivityNodeInterface[] {

    const map: Record<string, ActivityNodeInterface> = {};
    const roots: ActivityNodeInterface[] = [];

    for (const a of activities) {

      const base: ActivityNodeInterface = {
        id: a.reference.id,
        activityId: a.id,
        type: a.reference.type,
        author: a.reference.author,
        parentReferenceId: undefined,
        createdAt: new Date(a.createdAt),
        children: []
      };

      if (a.reference.type === ActivityType.COMMENT) {
        const data = a.reference.data as CommentActivityReference;
        base.parentReferenceId = data.parentReferenceId;
        base.content = data.content;
      }

      if (a.reference.type === ActivityType.FILE) {
        const data = a.reference.data as FileActivityReference;
        base.content = data.content;
        base.file = data;
        base.parentReferenceId = undefined;
      }

      if (a.reference.type === ActivityType.MEETING) {
        const data = a.reference.data as MeetingActivityReference;
        base.meeting = data;
        base.content = data.content;
        base.parentReferenceId = undefined;
      }

      map[a.reference.id] = base;
    }

    for (const id in map) {
      const node = map[id];

      if (node.type === ActivityType.FILE) {
        roots.push(node);
        continue;
      }

      if (node.parentReferenceId && map[node.parentReferenceId]) {
        map[node.parentReferenceId].children.push(node);
      } else {
        roots.push(node);
      }
    }

    const sortTree = (arr: ActivityNodeInterface[]) => {
      arr.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      arr.forEach(n => sortTree(n.children));
    };

    sortTree(roots);

    return roots;
  }

}
