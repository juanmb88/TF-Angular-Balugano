import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
//import { ErrorDeCargaComponent } from '../../helpers/utils/error-de-carga/error-de-carga.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path: '**',
    redirectTo: "login",
    //component: ErrorDeCargaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
