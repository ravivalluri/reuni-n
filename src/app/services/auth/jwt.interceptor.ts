import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './auth.service';
import * as moment from 'moment';
import * as jwt_decode from "jwt-decode";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentAuth = this.authenticationService.currentAuthValue;
        if (currentAuth && currentAuth.token) {
            if(moment(new Date()).isAfter(moment.unix(jwt_decode(currentAuth.token).exp))){
                currentAuth = null;
                this.authenticationService.logout();
            }else{
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${currentAuth.token}`
                    }
                });
            }
        }

        return next.handle(request);
    }
}