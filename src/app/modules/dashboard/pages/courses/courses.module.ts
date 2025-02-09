import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpersModule } from '../../../../helpers/helpers.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { CourseFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';


@NgModule({
  declarations: [
    CoursesComponent,
    CoursesTableComponent,
    CourseFormDialogComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    HelpersModule
  ]
})
export class CoursesModule { }
