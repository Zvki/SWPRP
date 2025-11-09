import {inject, Injectable, signal, Signal} from '@angular/core';
import {catchError, map, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserData} from '../../interfaces/user-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient)
  private API_URL = 'http://localhost:8080/swprp/auth'

  private userStore = signal<UserData | null>(null);


  public login(credentials: {email: string, password: string}): Observable<boolean> {
    return this.http.post<UserData>(this.API_URL + "/login",
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

  public get getUserStore(): Signal<UserData | null>{
    return this.userStore;
  }

  public logout(): void {
    this.http.post(this.API_URL + "/logout", {}, {withCredentials: true}).subscribe();
    this.userStore.set(null);
  }

}
