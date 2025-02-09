///Maneja la capa de datos maneja la comunicacoin con nuestra api y servicios externos//
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { Student } from '../../modules/dashboard/pages/students/models';
import { generateRandomString } from '../../helpers/utils';
import { delay, interval, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  //devuelve el listado de estudiantes
  getStudentsPromise(): Promise<Student[]> {
    return new Promise<Student[]>((resolve, reject) => {
      // reject('Error de conexion');
      setTimeout(() => {
        resolve([
          {
            id: generateRandomString(6),
            name: 'Jill',
            lastName: 'Valentine',
            age: 36,
            email: "jill@jill.com",
            phone: 888999777,
            nationality: "Argentina"
          },
          {
            id: generateRandomString(6),
            name: 'Chris',
            lastName: 'Redfield',
            age: 23,
            email: "chris@chris.com",
            phone: 888999777,
            nationality: "Argentina"
          },
        ]);
      }, 3000);
    });
  }

//este metodo con observable retorna un array de estudiantes 
//suscriber es una referencia a los oyentes q estan suscrita a este observable
  getStudentsObservable(): Observable<Student[]> {
    return new Observable<Student[]>((subscriber) => {
      const students =  [
            {
              id: generateRandomString(6),
              name: 'Jill',
              lastName: 'Valentine',
              age: 23,
              email: "chris@chris.com",
              phone: 888999777,
              nationality: "Argentina"
            },
            {
              id: generateRandomString(6),
              name: 'Chris',
              lastName: 'Redfield',
              age: 23,
              email: "chris@chris.com",
              phone: 888999777,
              nationality: "Argentina"
            },
          ]


      setTimeout(()=>{ 
        students.push({
          id: generateRandomString(6),
          name: 'Juan',
          lastName: 'Balugano',
          age: 36,
          email: "juan@juan.com",
          phone: 909009909,
          nationality: "Argentina"
        })
        subscriber.next(students);
  /* subscriber.error("error al cargar la lista de estudiantes")*/  
      
        subscriber.complete();// notifica al subcriptor/es q este obsevable no emite mas datos es como el .finally en una promesa

      }, 1000)
    });
  };
  
  getInterval(): Observable<number> {
    return interval(1000);
  }

  getRoles(): Observable<string[]> {
    return of(['ADMIN', 'STUDENT', 'SELLER']).pipe(delay(1000));
  }


}
