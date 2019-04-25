import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DanceStyle } from '../model/dancestyle';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DanceStylePublicService {

  private  URL:string = environment.backend+"public/dancestyle";
  constructor(private http: HttpClient) { }
  
  getDanceStyles() : Observable<DanceStyle[]>{
    let headers = new HttpHeaders();
    const httpOptions = {
        headers: headers
    };
    return this.http.get<DanceStyle[]>(this.URL, httpOptions);
  }
}
