import { Injectable } from '@angular/core';
import { LoginPayload } from '../../modules/auth/models';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../../modules/dashboard/pages/users/models';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/auth/auth.actions';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { selectAuthUser } from '../../store/auth/auth.selectors';


@Injectable({ providedIn: 'root' })
export class AuthService {
  //private _authUser$ = new BehaviorSubject<null | User>(null);
  authUser$ : Observable<User | null>

  constructor(private router: Router, private store:Store, private httpClient: HttpClient) {
    this.authUser$ = this.store.select(selectAuthUser);
  }

  get isAdmin$(): Observable<boolean> {
    return this.authUser$.pipe(map((x) => x?.role === 'ADMIN'));
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.store.dispatch(AuthActions.unsetAuthUser());
    this.router.navigate(['auth', 'login']);;
  }

  login(payload: LoginPayload): void {

      this.httpClient.get<User[]>(`${environment.baseApiUrl}/users?email=${payload.email}&password=${payload.password}`
      ).subscribe({
        next:(usersResult)=>{
          if(!usersResult[0]){
            alert('Email o password invalidos');
            return;
          }else{
            localStorage.setItem('access_token', usersResult[0].accessToken);
            this.store.dispatch(AuthActions.setAuthUser({user:usersResult[0]}))
            this.router.navigate(['dashboard', 'home']);
          }
        },
          error: (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 0) {
              alert('El servidor esta caido');//aca dice de evaluar una funcion que sea reutilizable para  no estar evaluando lo mismo y mostrar unos cartelitos o alertas
            }
          }
        },
      })
   //this.authUser$.next(loginResult) PROBA ESTO PORQUE EL PROFE LO USA Y YO NO
  }

  isAuthenticated(): Observable<boolean> {

    return this.httpClient.get<User[]>(`${environment.baseApiUrl}/users?accessToken=${localStorage.getItem('access_token')}`
    ).pipe(
      map((res)=>{
        const userResult = res[0];
        if (userResult) {//restablecer el usuario en el storage
          this.store.dispatch(AuthActions.setAuthUser({ user: userResult }));
        }
        return !!userResult;
      })
    );


  }
}