import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../../model/student';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private  URL:string = environment.backend+"private/student";
  constructor(private http: HttpClient) { }
  
  getStudents() : Observable<Student[]>{
    let headers = new HttpHeaders();
    //var token = this.authService.getToken();
    //headers = headers.append('Authorization',token.token_type+" "+token.access_token);
    const httpOptions = {
        headers: headers
    };
    return this.http.get<Student[]>(this.URL, httpOptions);
  }
  addStudent(model:Student) : Observable<Student>{
    let headers = new HttpHeaders();
    //var token = this.authService.getToken();
    //headers = headers.append('Authorization',token.token_type+" "+token.access_token);
    const httpOptions = {
        headers: headers
    };
    return this.http.post<Student>(this.URL,model, httpOptions);
  }
  updateStudent(model:Student) : Observable<Student>{
    let headers = new HttpHeaders();
    //var token = this.authService.getToken();
    //headers = headers.append('Authorization',token.token_type+" "+token.access_token);
    const httpOptions = {
        headers: headers
    };
    return this.http.put<Student>(this.URL+"/"+model._id,model, httpOptions);
  }
  deleteStudent(id:string) : Observable<Object>{
    let headers = new HttpHeaders();
    //var token = this.authService.getToken();
    //headers = headers.append('Authorization',token.token_type+" "+token.access_token);
    const httpOptions = {
        headers: headers
    };
    return this.http.delete(this.URL+"/"+id, httpOptions);
  }
  getStudent(id: string) : Observable<Student>{
    let headers = new HttpHeaders();
    //var token = this.authService.getToken();
    //headers = headers.append('Authorization',token.token_type+" "+token.access_token);
    const httpOptions = {
        headers: headers
    };
    return this.http.get<Student>(this.URL+"/"+id, httpOptions);
  }
}
