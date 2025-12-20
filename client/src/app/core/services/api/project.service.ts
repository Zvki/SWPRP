import {inject, Injectable, Signal, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GroupedProjects, ProjectResponse} from '../../interfaces/project/project-response';
import {catchError, map, Observable, of, tap} from 'rxjs';
import {ProjectRequest} from '../../interfaces/project/project-request.interface';
import {MembershipRequest} from '../../interfaces/project/membership-request.interface';
import {SnackbarService} from '../../../shared/utils/snackbar.service';
import {StatusRequest} from '../../interfaces/project/status-request.interface';
import {Router} from '@angular/router';
import {LinkRequest} from '../../interfaces/project/link-request.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly http = inject(HttpClient)
  private readonly API_URL = '/swprp/project'
  private readonly snackbar = inject(SnackbarService);
  private readonly router = inject(Router)

  private readonly _projectsStore = signal<GroupedProjects | null>(null);
  private readonly _project = signal<ProjectResponse | null>(null);

  public get projectsStore(): Signal<GroupedProjects | null> {
    return this._projectsStore;
  }

  public get project(): Signal<ProjectResponse | null> {
    return this._project;
  }

  public getProjects(): void {
    this.http.get<ProjectResponse[]>(this.API_URL,
      {withCredentials: true})
      .pipe(
        map(projects => {
          const grouped = projects.reduce((acc, project) => {
            acc[project.status].push(project);
            return acc;
          }, {
            ACTIVE: [],
            PENDING: [],
            FINISHED: []
          } as GroupedProjects);

          this._projectsStore.set(grouped);
        }),
        catchError(() => of(false))
      ).subscribe()
    ;
  }

  public getProject(id: string): void {
    this.http.get<ProjectResponse>(
      `${this.API_URL}/${id}`,
      {withCredentials: true}
    ).subscribe({
      next: response => this._project.set(response),
      error: err => {
        this._project.set(null);
        this.snackbar.error("Nie udało sie pobrać projektu")
        this.router.navigate(['/dashboard']);
      }
    });
  }

  public createProject(project: ProjectRequest): Observable<Object> {
    return this.http.post(`${this.API_URL}`, project, {withCredentials: true})
      .pipe(tap({
        next: () => {
          this.getProjects()
          this.snackbar.success("Utworzono projekt!")
        },
        error: err => {
          this.snackbar.error("Nie udało się utworzyć projektu!")
          console.error('Error creating project', err)
        }
      }));
  }

  public changeStatus(data: StatusRequest): Observable<Object> {
    return this.http.patch(`${this.API_URL}/status`, data, {withCredentials: true}).pipe(tap({
      next: () => {
        this.snackbar.success("Status zmieniony!")
        this.getProjects()
      },
      error: err => {
        this.snackbar.error("Nie udało sie zmienić statusu!")
        console.error('Error changing status', err)
      }
    }));
  }

  public addMember(data: MembershipRequest): void {
    this.http.post(`${this.API_URL}/add-member`, data, {withCredentials: true}).subscribe({
      next: () => this.snackbar.info(`Wysłano zaproszenie do ${data.email}`),
      error: err => {
        this.snackbar.error(`Nie udało sie wysłać zaproszenia do ${data.email}`)
        console.error('Error adding member', err)
      }
    });
  }

  public addLink(url: string): void {
    if (!this.project()) return;

    const data: LinkRequest = {
      projectId: this.project()!.id,
      url: url,
    }

    this.http.post(`${this.API_URL}/add-link`, data, {withCredentials: true}).subscribe({
      next: () => {
        this.snackbar.success("Dodano link do projektu!"),
          this.getProject(this.project()!.id)
      },
      error: err => this.snackbar.error("Wystąpił błąd podczas dodawania linku do projektu!")
    })
  }
}
