import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Course } from '../../modules/dashboard/pages/courses/models';
import { generateRandomString } from '../../helpers/utils';
let MY_FAKE_DATABASE: Course[] = [
  {
    id: generateRandomString(6),
    name: 'Javascript',
    teacher:"Juan",
    time:"400"
  },
  {
    id: generateRandomString(6),
    name: 'Angular',
    teacher:"Juan",
    time:"400"

  },
  {
    id: generateRandomString(6),
    name: 'RxJs',
    teacher:"Juan",
    time:"400"
  },
];

@Injectable({ providedIn: 'root' })
export class CourseService {

  
  updateCourseById(id: string, data: { name: string }): Observable<Course[]> {
    MY_FAKE_DATABASE = MY_FAKE_DATABASE.map((course) =>
      course.id === id ? { ...course, ...data } : course
    );
    return this.getCourses();
  }

   addCourse(payload: { name: string, teacher:string,time:string }): Observable<Course[]> {
    MY_FAKE_DATABASE.push({
      ...payload,
      id: generateRandomString(6),
    });
    return this.getCourses();
  } 

  getCourses(): Observable<Course[]> {
    return of([...MY_FAKE_DATABASE]).pipe(delay(1000));
  }

  deleteCourseById(id: string): Observable<Course[]> {
    MY_FAKE_DATABASE = MY_FAKE_DATABASE.filter((course) => course.id != id);
    return this.getCourses();
  }
}