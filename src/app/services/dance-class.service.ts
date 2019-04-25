import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DanceClass } from '../model/danceclass';
import {environment} from '../../environments/environment';
import { Booking } from '../model/booking';

@Injectable({
  providedIn: 'root'
})
export class DanceClassPublicService {

  private  URL:string = environment.backend+"public/danceclass";
  constructor(private http: HttpClient) { }
  
  getDanceClasses() : Observable<DanceClass[]>{
    let headers = new HttpHeaders();
    //var token = this.authService.getToken();
    //headers = headers.append('Authorization',token.token_type+" "+token.access_token);
    const httpOptions = {
        headers: headers
    };
    return this.http.get<DanceClass[]>(this.URL, httpOptions);
  }
  getDanceClass(id: string) : Observable<DanceClass>{
    let headers = new HttpHeaders();
    //var token = this.authService.getToken();
    //headers = headers.append('Authorization',token.token_type+" "+token.access_token);
    const httpOptions = {
        headers: headers
    };
    return this.http.get<DanceClass>(this.URL+"/"+id, httpOptions);
  }
  booking(id: string, model: Booking) : Observable<String>{
    let headers = new HttpHeaders();
    const httpOptions = {
        headers: headers
    };
    return this.http.post<String>(this.URL+"/"+id+"/booking",model, httpOptions);
  } 
}
