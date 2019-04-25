import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthResult } from '../../model/authResult';
import { environment } from '../../../environments/environment';
import { User } from 'src/app/model/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentAuthSubject: BehaviorSubject<AuthResult>;
    public currentUser: Observable<AuthResult>;

    constructor(private http: HttpClient) {
        this.currentAuthSubject = new BehaviorSubject<AuthResult>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentAuthSubject.asObservable();
    }

    public get currentAuthValue(): AuthResult {
        return this.currentAuthSubject.value;
    }
    signup(user: User) {

        return this.http.post<any>(environment.backend+'auth/signup',user).pipe(map(authResult=>{
            if (authResult && authResult.token) {
                localStorage.setItem('currentUser', JSON.stringify(authResult));
                this.currentAuthSubject.next(authResult);
            }
            return authResult;
        }));
    }

    login(username: string, password: string) {
        return this.http.post<any>( environment.backend+'auth/login', { username, password })
            .pipe(map(authResult => {
                if (authResult && authResult.token) {
                    localStorage.setItem('currentUser', JSON.stringify(authResult));
                    this.currentAuthSubject.next(authResult);
                }

                return authResult;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentAuthSubject.next(null);
    }
}