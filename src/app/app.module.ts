import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentsComponent } from './students/students.component';
import { ClassesComponent } from './classes/classes.component';
import { DanceStyleComponent } from './dance-style/dance-style.component';
import { DashboardItemComponent } from './dashboard-item/dashboard-item.component';
//import { AgmCoreModule } from '@agm/core';
import { AdminComponent } from './admin/admin.component';
import { FormStudentsComponent } from './students/form-students.component';
import { FormClassesComponent } from './classes/form-classes.component';
import { StudentService } from './services/private/student.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { CloseMenu } from './directives/close-menu';
import { DanceStyleService } from './services/private/dance-style.service';
import { DanceStylePublicService } from './services/dance-style.service';
import { DanceClassService } from './services/private/dance-class.service';
import { DanceClassPublicService } from './services/dance-class.service';
import { AuthenticationService } from './services/auth/auth.service';
import { CallbackComponent } from './callback/callback.component';
import { JwtInterceptor } from './services/auth/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookingComponent } from './booking/booking.component';
import { textLimitPipe } from './directives/text.pipe';
import { SendComponent } from './classes/send.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    BookingComponent,
    DashboardComponent,
    StudentsComponent,
    ClassesComponent,
    SendComponent,
    DanceStyleComponent,
    DashboardItemComponent,
    AdminComponent,
    FormStudentsComponent,
    FormClassesComponent,
    CallbackComponent,
    textLimitPipe
    //CloseMenu
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    //AgmCoreModule.forRoot({
    //  apiKey: 'AIzaSyDZ3J5mDE4rBJiiqi0ZNiM8RKWIv76Uu4o',
    //  libraries: ["places"] 
    //})
  ],
  providers: [
    StudentService,
    DanceStyleService,
    DanceStylePublicService,
    DanceClassService,
    DanceClassPublicService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
