import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-dialog-form',
  standalone: false,
  
  templateUrl: './student-dialog-form.component.html',
  styleUrl: './student-dialog-form.component.scss'
})
export class StudentDialogFormComponent {
  studentForm : FormGroup;
 constructor(private fb: FormBuilder){
    this.studentForm = this.fb.group({
      name:[null,Validators.required],
      lastName : [null, Validators.required]
    });
  }

 onSubmit(){
    if(this.studentForm.invalid){
      this.studentForm.markAllAsTouched();
    }else{
//evalua edicion
    
//aca decimos que guarden los datros pusheados del estrudiante dentro de la tabla de AngMaterial.
      this.studentForm.reset();
    }
  }

}
