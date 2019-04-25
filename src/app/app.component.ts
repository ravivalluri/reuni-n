import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AuthResult } from './model/authResult';
import { AuthenticationService } from './services/auth/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  publicMenu:boolean = true;
  currentAuth: AuthResult;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentAuth = x);
      router.events.subscribe((val) => {
          if(val instanceof NavigationEnd){
            if(val.url.indexOf("/admin") >= 0){
              this.publicMenu = false;
            }else {
              this.publicMenu = true;
            }
          }
      });
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/home/login']);
  }

}
