import { Component, OnInit, HostBinding } from '@angular/core';
import { User } from '../model/user';
import { Routes, Router, ActivatedRoute, ParamMap } from '@angular/router';
import { slideInDownAnimation } from '../animations';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css'],
  animations: [ slideInDownAnimation ]

})
export class SendComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  isValid: Boolean;
  classId: String;
  sendForm:FormGroup = new FormGroup({
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
    private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.isValid = params.has("id");
      if(this.isValid)
        this.classId = params.get("id");
    });
  }
  sendSubmit() {
    console.log(this.sendForm.value);
    this.loading = true;
    setTimeout(()=>{
      this.loading = false;
    },1000);

  }

}
