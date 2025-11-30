import {catchError, from, Observable, switchMap} from 'rxjs';
import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {KeycloakService} from '../services/auth/keycloak.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloak = inject(KeycloakService);

  return from(keycloak.updateToken()).pipe(
    switchMap(() => {
      const token = keycloak.getToken();

      if (token) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }

      return next(req);
    }),
    catchError(() => next(req))
  );
};
