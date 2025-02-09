import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models';

@Component({
  selector: 'app-courses-table',
  standalone: false,
  
  templateUrl: './courses-table.component.html',
  styleUrl: './courses-table.component.scss'
})
export class CoursesTableComponent {
displayedColumns= ['id',"name","teacher","time","actions"];

@Input()
dataSource : Course[] = [];


@Output()
delete = new EventEmitter<string>()


@Output()
edit = new EventEmitter<Course>()
}
