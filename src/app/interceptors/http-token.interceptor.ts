import { HttpEvent, HttpHandler, HttpHandlerFn, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { inject } from "@angular/core";
import { Observable } from "rxjs"
import { KeycloakService } from "../core/services/keycloak/keycloak.service";

export const httpTokenInterceptor = (request: HttpRequest<unknown>, next: HttpHandlerFn ) => {

    //si obtengo el token del contexto de keycloak
    //envio el token en el request deseado
    const token = inject(KeycloakService).keycloak.token;
    if(token) {
        const authReq = request.clone({
            headers: new HttpHeaders({
                Authorization: `Bearer ${token}`
            })
        });
        return next(authReq);
    }
    return next(request);
        
}