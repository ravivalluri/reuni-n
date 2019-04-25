import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DanceClass } from '../../model/danceclass';
import { environment } from '../../../environments/environment';
import { DanceStyle } from 'src/app/model/dancestyle';

@Injectable({
  providedIn: 'root'
})
export class DanceStyleService {

  private  URL:string = environment.backend+"private/dancestyle";
  constructor(private http: HttpClient) { }
  
  getDanceStyles() : Observable<DanceStyle[]>{
    let headers = new HttpHeaders();
    //var token = this.authService.getToken();
    //headers = headers.append('Authorization',token.token_type+" "+token.access_token);
    const httpOptions = {
        headers: headers
    };
    return this.http.get<DanceStyle[]>(this.URL, httpOptions);
  }
}
