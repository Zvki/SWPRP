import {inject, Injectable, Signal, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProjectResponse} from '../../interfaces/project/project-response';
import {catchError, map, Observable, of} from 'rxjs';
import {UserResponse} from '../../interfaces/user-response';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private http = inject(HttpClient)
  private API_URL = 'http://localhost:8080/swprp/project'

  private projectsStore = signal<ProjectResponse[] | null>(null);

  public get getProjectsStore(): Signal<ProjectResponse[] | null>{
    return this.projectsStore;
  }

  public getProjects(): void {
    this.http.get<ProjectResponse[]>(this.API_URL,
      {withCredentials: true})
      .pipe(
        map(projects => {
          this.projectsStore.set(projects);
        }),
        catchError(() => of(false))
      ).subscribe()
      ;
  }

}
