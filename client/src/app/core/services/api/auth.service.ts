import {inject, Injectable, signal, Signal} from '@angular/core';
import {catchError, map, Observable, of, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserResponse} from '../../interfaces/user-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient)
  private API_URL = 'http://localhost:4200/swprp/auth'

  private readonly _user = signal<UserResponse | null>(null);


  public login(credentials: {email: string, password: string}): Observable<boolean> {
    return this.http.post<UserResponse>(this.API_URL + "/login",
      credentials,
      {withCredentials: true})
      .pipe(
        map(user => {
          this._user.set(user);
          return true;
        }),
          catchError(() => of(false))
      )
      ;
  }

  public initUser(): void {
    this.http.get<UserResponse>(`${this.API_URL}/me`, { withCredentials: true })
      .pipe(
        tap(user => this._user.set(user)),
        catchError(() => {
          this._user.set(null);
          return of(null);
        })
      )
      .subscribe();
  }

  public get user(): Signal<UserResponse | null>{
    return this._user;
  }

  public logout(): void {
    this.http.post(this.API_URL + "/logout", {}, {withCredentials: true}).subscribe();
    this._user.set(null);
  }

}
