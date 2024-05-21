import { HttpHandler, HttpHandlerFn, HttpHeaders, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { KeycloakService } from "../core/services/keycloak/keycloak.service";
import { s } from "@fullcalendar/core/internal-common";

export const securityInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next:HttpHandlerFn) => {
  const keycloak = inject(KeycloakService);
  const token = keycloak.keycloak.token;

  if (token) {
    const authReq = request.clone({
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
    return next(authReq);
  }
  return next(request);
}