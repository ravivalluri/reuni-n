import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClassesComponent } from './classes/classes.component';
import { StudentsComponent } from './students/students.component';
import { AdminComponent } from './admin/admin.component';
import { FormStudentsComponent } from './students/form-students.component';
import { FormClassesComponent } from './classes/form-classes.component';
import { AuthGuard } from './services/guard/auth.guard';
import { BookingComponent } from './booking/booking.component';
import { SendComponent } from './classes/send.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent,
  
  children: [
    {
      path: '',
      children: [
        { path: 'login', component: LoginComponent },
        { path: 'signup', component: SignupComponent },
        { path: 'danceclass/:danceclassid/booking', component: BookingComponent },
      ]
    }
  ]
  },
  
];

export const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: '', component: DashboardComponent },
          { path: 'classes', component: ClassesComponent },
          { path: 'students', component: StudentsComponent },
          { path: 'students/detail/:id', component: FormStudentsComponent },
          { path: 'students/new', component: FormStudentsComponent },
          { path: 'classes/detail/:id', component: FormClassesComponent, 
            children: [
              { path: 'send', component: SendComponent }
            ]
          },
          { path: 'classes/new', component: FormClassesComponent }
        ]
      }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    RouterModule.forChild(adminRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
