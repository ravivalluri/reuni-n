import { Component, OnInit } from '@angular/core';
import { DanceClass } from '../model/danceclass';
import { DanceClassService } from '../services/private/dance-class.service';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import * as jwt_decode from "jwt-decode";
import { AuthenticationService } from '../services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  studentClasses: DanceClass[] = [];
  classes: DanceClass[] = [];
  organizer: Boolean;
  student: Boolean;
  constructor(private danceClassService:DanceClassService, private authenticationService:AuthenticationService) { }

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
    if(this.student){
      this.danceClassService.getDanceClassesByStudents().pipe(map(x=>{
        x.forEach(element=>{
          element.toDateFormated = moment(element.toDate).format("Do MMM YYYY")
          element.fromDateFormated = moment(element.fromDate).format("Do MMM YYYY")
          element.toTimeFormated = moment(element.toDate).format("HH:mm")
          element.fromTimeFormated = moment(element.fromDate).format("HH:mm")
        })
        return x;
      })).subscribe(res=>{
        this.studentClasses = res;
      });
    }
    if(this.organizer){
      this.danceClassService.getDanceClasses().pipe(map(x=>{
        x.forEach(element=>{
          element.toDateFormated = moment(element.toDate).format("Do MMM YYYY")
          element.fromDateFormated = moment(element.fromDate).format("Do MMM YYYY")
          element.toTimeFormated = moment(element.toDate).format("HH:mm")
          element.fromTimeFormated = moment(element.fromDate).format("HH:mm")
        })
        return x;
      })).subscribe(res=>{
        this.classes = res;
      });
    }
  }

}
