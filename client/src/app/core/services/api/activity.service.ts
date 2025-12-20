import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  ActivityList,
  ActivityResponse,
  ActivityType,
  CommentActivityReference,
  FileActivityReference, FileStatus,
  MeetingActivityReference
} from '../../interfaces/activity/activity.interface';
import {ActivityNodeInterface} from '../../interfaces/activity/activity-node.interface';
import {CommentRequest} from '../../interfaces/activity/comment-request.interface';
import {MeetingRequest} from '../../interfaces/activity/meeting-request.interface';
import {FileRequest} from '../../interfaces/activity/file-request.interface';
import {Observable, tap} from 'rxjs';
import {FileStatusRequest} from '../../interfaces/activity/file-status-request.interface';
import {ProjectService} from './project.service';
import {MeetingNoteRequest} from '../../interfaces/activity/meeting-note-request.interface';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private API_URL = '/swprp/activity'
  private readonly project = inject(ProjectService).project;
  activityTree = signal<ActivityNodeInterface[]>([]);
  filesTree = signal<ActivityNodeInterface[]>([]);
  meetingTree = signal<ActivityNodeInterface[]>([]);
  pendingFiles = signal<ActivityNodeInterface[]>([]);
  nextMeetings = signal<ActivityNodeInterface[]>([]);
  meetings = signal<MeetingActivityReference[]>([]);

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
        next: res => {
          this.meetings.set(res.activities.map(a => a.reference.data as MeetingActivityReference));
          this.meetingTree.set(this.buildTree(res.activities))
        },
        error: err => {
          console.error('Error loading meetings', err);
          this.meetingTree.set([]);
        }
      });
  }

  public loadFilesByStatus(status: FileStatus): void {
    this.http.get<ActivityList>(`${this.API_URL}/files/${status}`)
      .subscribe({
        next: res => {
          this.pendingFiles.set(this.buildTree(res.activities))
        },
        error: err => {
          console.error('Error loading pending files', err);
          this.pendingFiles.set([]);
        }
      })
  }

  public loadNextMeetings(): void {
    this.http.get<ActivityList>(`${this.API_URL}/next-meetings`)
      .subscribe({
        next: res => this.nextMeetings.set(this.buildTree(res.activities)),
        error: err => {
          console.error('Error loading meetings', err);
          this.nextMeetings.set([]);
        }
      })
  }

  public addComment(data: CommentRequest): Observable<Object> {
    return this.http.post(`${this.API_URL}/comment`, data)
      .pipe(
        tap({
          next: () => this.refreshActivities(),
          error: err => console.error('Error adding comment', err)
        })
      );
  }

  public addFile(data: FileRequest): Observable<Object> {
    const formData = new FormData();
    formData.append('projectId', data.projectId);
    formData.append('file', data.file);
    formData.append('content', data.content);

    return this.http.post(`${this.API_URL}/file`, formData)
      .pipe(
        tap({
          next: () => this.refreshActivities(),
          error: err => console.error('Error adding file', err)
        })
      );
  }

  public updateFileStatus(data: FileStatusRequest): Observable<Object> {
    return this.http.patch(`${this.API_URL}/file-status`, data).pipe(
      tap({
        next: () => {
          this.loadFilesByStatus(FileStatus.PENDING);
          if (this.project()) this.refreshActivities()
        },
        error: err => console.error('Error updating file status', err)
      })
    )
  }

  public addMeeting(data: MeetingRequest): Observable<Object> {
    return this.http.post(`${this.API_URL}/meeting`, data).pipe(
      tap({
        next: () => this.refreshActivities(),
        error: err => console.error('Error adding meeting', err)
      })
    );
  }

  public addMeetingNote(data: MeetingNoteRequest): Observable<Object> {
    return this.http.patch(`${this.API_URL}/meeting-note`, data).pipe(
      tap({
        next: () => this.refreshActivities(),
        error: err => console.error('Error adding meeting note', err)
      })
    );
  }

  public deleteActivity(activityId: string): void {
    this.http.delete(`${this.API_URL}/${activityId}`)
      .subscribe({
        next: () => this.refreshActivities(),
        error: err => console.error('Error deleting activity', err)
      });
  }

  public refreshActivities(id: string = this.project()!.id): void {
    this.loadActivities(id);
    this.loadFiles(id);
    this.loadMeetings(id);

    this.loadNextMeetings();
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
        base.content = a.reference.content;
      }

      if (a.reference.type === ActivityType.FILE) {
        const data = a.reference.data as FileActivityReference;
        base.content = a.reference.content;
        base.file = data;
        base.parentReferenceId = undefined;
      }

      if (a.reference.type === ActivityType.MEETING) {
        base.meeting = a.reference.data as MeetingActivityReference;
        base.content = a.reference.content;
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
