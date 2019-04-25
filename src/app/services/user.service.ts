import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private  URL:string = environment.backend+"auth/signin";
  constructor(private http: HttpClient) { }
  
  addUser(model:User) : Observable<String>{
    let headers = new HttpHeaders();
    //headers = headers.append('Authorization',token.token_type+" "+token.access_token);
    const httpOptions = {
        headers: headers
    };
    return this.http.post<String>(this.URL,model, httpOptions);
  }
}
