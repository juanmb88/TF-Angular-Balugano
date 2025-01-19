import { Component } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { Student } from './models/index';
import { generateRandomString } from '../../../../helpers/utils';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-students',
  standalone: false,
  
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {
  
  studentForm : FormGroup;//nombre de mi formulario y declaracion de formGroup
///PROPIEDADES DE LA TABLA
  displayedColumns: string[] = ['id', 'name', 'lastName', 'actions'];
  studentsList : Student[] = [{
    id:generateRandomString(6),
    name:"juan",
    lastName:"Balugano"
  }];

  IdStudentEdit?:string | null = null

  constructor(private fb: FormBuilder, private matDialog : MatDialog){
    this.studentForm = this.fb.group({
      name:[null,Validators.required],
      lastName : [null, Validators.required]
    });
  }

//evento que pushea al array de estudiante dicho estudiante
  onSubmit(){
    if(this.studentForm.invalid){
      this.studentForm.markAllAsTouched();
    }else{
//evalua edicion
      if(!!this.IdStudentEdit){

      this.studentsList = this.studentsList.map((student) => 
      student.id === this.IdStudentEdit ?
         ({...student, ...this.studentForm.value})
         :student)
         this.IdStudentEdit = null;

      }else{
        //evalua pushear
        this.studentsList = [
          ...this.studentsList,
          {
            id: generateRandomString(6),
          ...this.studentForm.value,
          }
        ]
      }

//aca decimos que guarden los datros pusheados del estrudiante dentro de la tabla de AngMaterial.
      this.studentForm.reset();
    }
  }
//evento para eliinar estudiante
  onDelete( id:string ) { 
    if(confirm("Estas seguro de eliminar estudiante?")){
       this.studentsList = this.studentsList.filter((el)=> el.id != id)
    }
   }

   onEdit(student:Student):void {
    this.IdStudentEdit = student.id;
    this.studentForm.patchValue({
      name:student.name,
      lastName:student.lastName
    })
   }

}