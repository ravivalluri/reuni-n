import { Component, OnInit, HostBinding } from '@angular/core';
import { User } from '../model/user';
import { Routes, Router } from '@angular/router';
import { slideInDownAnimation } from '../animations';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/auth/auth.service';
import { first } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [ slideInDownAnimation ]

})
export class SignupComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  signup : User;

  signupForm:FormGroup = new FormGroup({
    username: new FormControl('',[Validators.minLength(2)]),
    email: new FormControl('',[Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)]),
    password: new FormControl('',[Validators.minLength(4)]),
    company: new FormControl('',[Validators.minLength(4)]),
    student: new FormControl(true),
    organizer: new FormControl(false),
  });
  loading = false;
  error = '';
  constructor(private router: Router, private userService : UserService,
    private authenticationService: AuthenticationService) {
    this.signup = new User();
  }
  ngOnInit() {

  }
  signupSubmit() {
    this.signup = this.signupForm.value;

    if(!this.signup.organizer){
      this.signup.company = "studentonly";
    }
    this.authenticationService.signup(this.signup)
        .pipe(first())
        .subscribe(
            data => {
              this.router.navigate(["/admin/"]);
            },
            error => {
              this.signupForm.setErrors({"responseError":error});
              console.error("Error:",error);
                this.error = error;
                this.loading = false;
            });
  }

}
