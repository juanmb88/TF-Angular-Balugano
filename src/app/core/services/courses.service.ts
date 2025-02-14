import { Injectable } from '@angular/core';
import { concatMap, Observable } from 'rxjs';
import { Course } from '../../modules/dashboard/pages/courses/models';
import { generateRandomString } from '../../helpers/utils';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class CourseService {
  
  constructor(private httpClient:HttpClient){}



  getCourseDetail(id: string): Observable<Course> {
    return this.httpClient.get<Course>(
      `${environment.baseApiUrl}/courses/${id}?_embed=teachers`
    );
  }

  
  updateCourseById(id: string, data: { name: string }): Observable<Course[]> {
  /*   MY_FAKE_DATABASE = MY_FAKE_DATABASE.map((course) =>
      course.id === id ? { ...course, ...data } : course
    );
    return this.getCourses(); */
    return this.httpClient.patch<Course>(`${environment.baseApiUrl}/courses/${id}`, data).pipe(concatMap(()=> this.getCourses()))

  }

   addCourse(payload: { name: string, teacher:string,time:string }): Observable<Course[]> {
   /*  MY_FAKE_DATABASE.push({
      ...payload,
      id: generateRandomString(6),
    });
    return this.getCourses(); */
    return this.httpClient.post<Course>(`${environment.baseApiUrl}/courses`, payload).pipe(concatMap(()=> this.getCourses()))
  } 

  getCourses(): Observable<Course[]> {
    const myHeaders = new HttpHeaders().append(
      'Authorization',
      localStorage.getItem('access_token') || ''
    );
   // return of([...MY_FAKE_DATABASE]).pipe(delay(1000));
   return this.httpClient.get<Course[]>(`${environment.baseApiUrl}/courses`, {headers:myHeaders})
  }

  
  deleteCourseById(id: string): Observable<Course[]> {
   /*  MY_FAKE_DATABASE = MY_FAKE_DATABASE.filter((course) => course.id != id);
    return this.getCourses(); */
    return this.httpClient.delete<Course>(`${environment.baseApiUrl}/courses/${id}`).pipe(concatMap(()=> this.getCourses()))

  }
}