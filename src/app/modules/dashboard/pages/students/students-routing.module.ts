import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { StudentsDetailComponent } from './pages/students-detail/students-detail.component';
//ruta base desde aca es dahsnborad/studnets
const routes: Routes = [{
  path : '',
  component:StudentsComponent

},
{
  path : ':id',
  component:StudentsDetailComponent

},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
