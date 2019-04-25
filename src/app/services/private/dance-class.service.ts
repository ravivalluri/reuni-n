import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DanceClass } from '../../model/danceclass';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DanceClassService {

  private  URL:string = environment.backend+"private/danceclass";
  private  URLAUTOCOMPLETE:string = environment.backend+"private/";
  constructor(private http: HttpClient) { }
  getCountries(name:string) : Observable<string[]>{
    let headers = new HttpHeaders();
    const httpOptions = {
        headers: headers,
        params: new HttpParams().set('country', name)
    };
    return this.http.get<string[]>(this.URLAUTOCOMPLETE+"countries", httpOptions);
  }
  getCities(country:string,name:string) : Observable<string[]>{
    let headers = new HttpHeaders();
    const httpOptions = {
        headers: headers,
        params: new HttpParams().set('country', country).set('city', name)
    };
    return this.http.get<string[]>(this.URLAUTOCOMPLETE+"cities", httpOptions);
  }
  
  getDanceClasses() : Observable<DanceClass[]>{
    let headers = new HttpHeaders();
    //var token = this.authService.getToken();
    //headers = headers.append('Authorization',token.token_type+" "+token.access_token);
    const httpOptions = {
        headers: headers
    };
    return this.http.get<DanceClass[]>(this.URL, httpOptions);
  }
  getDanceClassesByStudents() : Observable<DanceClass[]>{
    let headers = new HttpHeaders();
    //var token = this.authService.getToken();
    //headers = headers.append('Authorization',token.token_type+" "+token.access_token);
    const httpOptions = {
        headers: headers
    };
    return this.http.get<DanceClass[]>(this.URL+"bystudent", httpOptions);
  }
  addDanceClass(model:DanceClass) : Observable<DanceClass>{
    let headers = new HttpHeaders();
    //var token = this.authService.getToken();
    //headers = headers.append('Authorization',token.token_type+" "+token.access_token);
    const httpOptions = {
        headers: headers
    };
    return this.http.post<DanceClass>(this.URL,model, httpOptions);
  }
  updateDanceClass(model:DanceClass) : Observable<DanceClass>{
    let headers = new HttpHeaders();
    //var token = this.authService.getToken();
    headers = headers.append('Content-type','application/json');
    const httpOptions = {
        headers: headers
    };
    return this.http.put<DanceClass>(this.URL+"/"+model._id,model, httpOptions);
  }
  deleteDanceClass(id:string) : Observable<Object>{
    let headers = new HttpHeaders();
    //var token = this.authService.getToken();
    //headers = headers.append('Authorization',token.token_type+" "+token.access_token);
    const httpOptions = {
        headers: headers
    };
    return this.http.delete(this.URL+"/"+id, httpOptions);
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
}
