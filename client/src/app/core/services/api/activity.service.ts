import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  ActivityList,
  ActivityResponse,
  ActivityType,
  CommentActivityReference,
  FileActivityReference
} from '../../interfaces/activity/activity.interface';
import {ActivityNode} from '../../interfaces/activity/comment-node.interface';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private API_URL = 'http://localhost:4200/swprp/activity'
  commentsTree = signal<ActivityNode[]>([]);

  private readonly http = inject(HttpClient);

  public loadActivities(projectId: string): void {
    this.http.get<ActivityList>(`${this.API_URL}/${projectId}`)
      .subscribe({
        next: res => this.commentsTree.set(this.buildTree(res.activities)),
        error: err => {
          console.error('Error loading activities', err);
          this.commentsTree.set([]);
        }
      });
  }

  private buildTree(activities: ActivityResponse[]): ActivityNode[] {

    const map: Record<string, ActivityNode> = {};
    const roots: ActivityNode[] = [];

    for (const a of activities) {

      const base: ActivityNode = {
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
        base.file = a.reference.data as FileActivityReference;
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

    const sortTree = (arr: ActivityNode[]) => {
      arr.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      arr.forEach(n => sortTree(n.children));
    };

    sortTree(roots);

    return roots;
  }

}
