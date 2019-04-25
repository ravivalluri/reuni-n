import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  organizer: Boolean;
  student: Boolean;
  constructor(private router:Router,private authenticationService:AuthenticationService) { }

  ngOnInit() {
    let currentAuth = this.authenticationService.currentAuthValue;
    if (currentAuth && currentAuth.token) {
      if(moment(new Date()).isAfter(moment.unix(jwt_decode(currentAuth.token).exp))){
        currentAuth = null;
        this.authenticationService.logout();
      }else{
        const decodedToken = jwt_decode(currentAuth.token);
        if(decodedToken && decodedToken.data){
          this.organizer = decodedToken.data.organizer;
          this.student = decodedToken.data.student;
        }
      }
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/home/login']);
}

}
