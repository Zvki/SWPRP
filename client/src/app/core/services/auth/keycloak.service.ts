import {inject, Injectable} from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({ providedIn: 'root' })
export class KeycloakService {
  private readonly keycloak = inject(Keycloak);

  public updateToken(): Promise<boolean> {
    return this.keycloak.updateToken(30)
      .catch(() => {
        console.warn('Token refresh failed, logging out');
        this.keycloak.logout();
        return false;
      });
  }

  public getToken(): string {
    return this.keycloak.token ?? '';
  }

  public logout(): void {
    this.keycloak.logout();
  }
}
