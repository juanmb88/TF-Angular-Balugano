import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { Student } from './models/index';
import { generateRandomString } from '../../../../helpers/utils';
import { MatDialog } from '@angular/material/dialog';
import { StudentsService } from '../../../../core/services/students.service';
import { concatMap, forkJoin, map, Subscriber, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-students',
  standalone: false,
  
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit, OnDestroy {
  
  studentForm : FormGroup;//nombre de mi formulario y declaracion de formGroup
///PROPIEDADES DE LA TABLA
  displayedColumns: string[] = ['id', 'name', 'lastName','age','email','phone','nationality', 'actions'];
  studentsList : Student[] = [];
  isLoading = false;
  IdStudentEdit?:string | null = null;
  Error = false;
  studentsSubscription?: Subscription;

  constructor(private fb: FormBuilder, private matDialog : MatDialog, private StudentsService: StudentsService){
    this.studentForm = this.fb.group({
      name:[null,Validators.required],
      lastName : [null, Validators.required],
      age:[null,Validators.required],
      email:[null,Validators.required],
      phone:[null,Validators.required],
      nationality:[null,Validators.required],
    });
  }


  ngOnInit(): void {
    //este ciclo de vida se ejecuta despues del constructor al inicializar el componente
    //this.loadstudentsPromise();
  this.loadStudentsFromObs()
  };

  ngOnDestroy():void{
    this.studentsSubscription?.unsubscribe();
  };

  


  loadStudentsFromObs(): void {
    this.isLoading = true;
    this.studentsSubscription = this.StudentsService
        .getStudentsObservable()
                    // Entre que la info viaja del observable hacia el subcribe, podemos aplicar un pipe
        .subscribe({// para manipular la info, o el flujo de emisiones//.pipe(take(3))
        next: (students) => {
          console.log('Recibimos datos: ', students);
          this.studentsList = [...students];
          this.isLoading = false;
        },
        error: (error) => {
          alert(error);
          this.Error = true;
          this.isLoading = false;
        },
    complete: () => {
      this.isLoading = false;
        },
      });
  };

  loadstudentsPromise(): void {
  this.isLoading = true;
    this.StudentsService.getStudentsPromise()
    .then((student)=>{
      this.studentsList = student;
      this.Error = false;
    })
    .finally(()=>{
      this.isLoading = false;
    })
    .catch((error)=>{
      this.Error = true
     alert(`Hub un error ${error}`)
    })
  };

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
  };

//evento para eliinar estudiante
  onDelete( id:string ) { 
    if(confirm("Estas seguro de eliminar estudiante?")){
       this.studentsList = this.studentsList.filter((el)=> el.id != id)
    }
  };

  onEdit(student:Student):void {
    this.IdStudentEdit = student.id;
    this.studentForm.patchValue({
      name:student.name,
      lastName:student.lastName,
      age:student.age,
      email:student.email,
      phone:student.phone,
      nationality:student.nationality
    })
  };

}