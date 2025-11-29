import {inject, Injectable, Signal, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserResponse} from '../../interfaces/user-response';
import {catchError, map, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private http = inject(HttpClient)
  private API_URL = 'http://localhost:4200/swprp/user'

  private _supervisors = signal<UserResponse[] | null>(null);

  public get supervisors(): Signal<UserResponse[] | null> {
    return this._supervisors;
  }

  public getSupervisors(): void {
    this.http.get<UserResponse[]>(this.API_URL + "/supervisors", {withCredentials: true})
      .pipe(
        map(users => {
          this._supervisors.set(users);
        }),
        catchError(() => of(false))
      ).subscribe();
  }
}
