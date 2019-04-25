import { Component, OnInit } from '@angular/core';
import { Student } from '../model/student';
import { StudentService } from '../services/private/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: Student[];
  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.getStudents();
  }
  
  getStudents() : void {
    this.studentService.getStudents().subscribe(res=>{
      this.students = res;
    });
    console.log("List Students");
  }
  deleteStudent(id: string) : void {
    console.log("Delete: "+id);
    this.studentService.deleteStudent(id).subscribe(res=>{
      alert(res["text"]);
      this.getStudents();
    },
    err=>{
      console.error("Error:",err);
    });
  }
}
