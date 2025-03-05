import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { EnrollementActions } from './enrollement.actions';
import { EnrollmentsService } from '../../../../../core/services/enrollments.service';


@Injectable()
export class EnrollementEffects {
  private actions$ = inject(Actions);
  loadEnrollments$ = createEffect(() => {
    return this.actions$.pipe(
      // Quiero escuchar solamente las acciones de tipo:
      ofType(EnrollementActions.loadEnrollements),
      // Y luego quiero ir a buscar las enrollments a mi base de datos
      concatMap(() =>
        this.enrollmentsService.getEnrollments().pipe(
          // Si el servicio responde OK
          map((enrollments) =>
            EnrollementActions.loadEnrollementsSuccess({ data: enrollments })
          ),
          // Si el servicio desponde ERROR
          catchError((error) =>
            of(EnrollementActions.loadEnrollementsFailure({ error }))
          )
        )
      )
    );
  });
  
  createEnrollments$ = createEffect(() => {
    return this.actions$.pipe(
      // Quiero escuchar solamente las acciones de tipo:
      ofType(EnrollementActions.createEnrollment),
      // Y luego quiero ir a buscar las enrollments a mi base de datos
      concatMap((action) =>
        this.enrollmentsService.createEnrollment(action.data).pipe(
          // Si el servicio responde OK
          map((enrollment) =>
            EnrollementActions.createEnrollmentSuccess({ data: enrollment })
          ),
          // Si el servicio desponde ERROR
          catchError((error) =>
            of(EnrollementActions.createEnrollmentFailure({ error }))
          )
        )
      )
    );
  });

  constructor( private enrollmentsService: EnrollmentsService) {
   
  }
}
