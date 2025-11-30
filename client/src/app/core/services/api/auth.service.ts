import {inject, Injectable, signal, Signal} from '@angular/core';
import {catchError, map, Observable, of, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserResponse} from '../../interfaces/user-response';
import {KeycloakService} from '../auth/keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:4200/swprp/auth'
  private readonly http = inject(HttpClient);
  private readonly keycloak = inject(KeycloakService);

  private readonly _user = signal<UserResponse | null>(null);

  public initUser(): void {
      this.http.get<UserResponse>(`${this.API_URL}/me`)
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
    this._user.set(null);
    this.keycloak.logout();
  }

}
