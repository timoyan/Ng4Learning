import { Injectable, Injector } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const requestUrlSegement = request.url.split('/');
        const apiName = requestUrlSegement[requestUrlSegement.length - 1];
        const authService = this.injector.get(AuthService);
        const router = this.injector.get(Router);

        if (apiName !== 'login') {
            if (!authService.validateLoginStatus()) {
                router.navigate(['/login']);
                return null;
            }

            request = request.clone({
                setHeaders: {
                    RequestVerificationToken: authService.getAuthToken()
                }
            });
        } else {
            console.log('No need auth header!');
        }

        return next.handle(request);
    }
}