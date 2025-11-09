import {inject, Injectable, signal, Signal} from '@angular/core';
import {catchError, map, Observable, of, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserResponse} from '../../interfaces/user-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient)
  private API_URL = 'http://localhost:8080/swprp/auth'

  private userStore = signal<UserResponse | null>(null);


  public login(credentials: {email: string, password: string}): Observable<boolean> {
    return this.http.post<UserResponse>(this.API_URL + "/login",
      credentials,
      {withCredentials: true})
      .pipe(
        map(user => {
          this.userStore.set(user);
          return true;
        }),
          catchError(() => of(false))
      )
      ;
  }

  public initUser(): void {
    this.http.get<UserResponse>(`${this.API_URL}/me`, { withCredentials: true })
      .pipe(
        tap(user => this.userStore.set(user)),
        catchError(() => {
          this.userStore.set(null);
          return of(null);
        })
      )
      .subscribe();
  }

  public get getUserStore(): Signal<UserResponse | null>{
    return this.userStore;
  }

  public logout(): void {
    this.http.post(this.API_URL + "/logout", {}, {withCredentials: true}).subscribe();
    this.userStore.set(null);
  }

}
