import { Component, OnInit, HostBinding } from '@angular/core';
import { User } from '../model/user';
import { Routes, Router, ActivatedRoute, ParamMap } from '@angular/router';
import { slideInDownAnimation } from '../animations';
import { first } from 'rxjs/operators';
import { DanceClassPublicService } from '../services/dance-class.service';
import { Booking } from '../model/booking';
import { DanceClass } from '../model/danceclass';
import { Location } from "@angular/common";
import { FormGroup, FormControl, EmailValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  animations: [ slideInDownAnimation ]

})
export class BookingComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  booking : Booking;
  bookingForm:FormGroup = new FormGroup({
    name: new FormControl('',[Validators.minLength(2)]),
    email: new FormControl('',[Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)])
  });
  danceclass: DanceClass;
  danceClassId : string;
  loading = false;
  error = '';
  success = '';
  constructor(private router: Router, 
    private danceClassService: DanceClassPublicService,
    private route: ActivatedRoute,
    private _location: Location
    ) {
    this.booking = new Booking();
  }

  goBack() {
    this._location.back();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.danceClassId = params.get("danceclassid");
      this.danceClassService.getDanceClass(this.danceClassId).subscribe(res=>{
        this.danceclass = res;
      },err=>{
        console.error("Error:",err);
      })
    });

  }
  bookingSubmit() {
    //create booking method
    this.booking = this.bookingForm.value;    
    this.danceClassService.booking(this.danceClassId, this.booking).subscribe(
          data => {
            this.bookingForm.setErrors({});
            this.success = "Well done";
            setTimeout(()=>{this.goBack();},1500);
          },
          error => {
            this.bookingForm.setErrors({"responseError":error});
            console.error("Error",error);
            this.loading = false;
          });
  }

}
