import {inject, Injectable, Signal, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProjectResponse} from '../../interfaces/project/project-response';
import {catchError, map, Observable, of, tap} from 'rxjs';
import {ProjectRequest} from '../../interfaces/project/project-request.interface';
import {MembershipRequest} from '../../interfaces/project/membership-request.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private http = inject(HttpClient)
  private API_URL = 'http://localhost:4200/swprp/project'

  private readonly _projectsStore = signal<ProjectResponse[] | null>(null);

  public get projectsStore(): Signal<ProjectResponse[] | null>{
    return this._projectsStore;
  }

  public getProjects(): void {
    this.http.get<ProjectResponse[]>(this.API_URL,
      {withCredentials: true})
      .pipe(
        map(projects => {
          this._projectsStore.set(projects);
        }),
        catchError(() => of(false))
      ).subscribe()
      ;
  }

  public getProject(id: string): Observable<ProjectResponse> {
    return this.http.get<ProjectResponse>(
      `${this.API_URL}/${id}`,
      { withCredentials: true }
    );
  }

  public createProject(project: ProjectRequest): Observable<Object> {
    return this.http.post(`${this.API_URL}`, project, {withCredentials: true})
      .pipe(tap({
        next: () => this.getProjects(),
        error: err => console.error('Error creating project', err)
      }));
  }

  public changeStatus(id: string): void {
    this.http.patch(`${this.API_URL}/${id}`, {}, {withCredentials: true}).subscribe({
      next: () => this.getProjects(),
      error: err => console.error('Error changing status', err)
    });
  }

  public addMember(data: MembershipRequest): void {
    this.http.post(`${this.API_URL}/add-member`, data, {withCredentials: true}).subscribe();
  }
}
