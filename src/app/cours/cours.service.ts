import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  private GetAllCourses = 'https://localhost:7012/api/Course/GetAllCourses'; //  l'URL de l' API
  private GetCourseUrl = 'https://localhost:7012/api/Course/';

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<any[]>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any[]>(`${this.GetAllCourses}`,{ headers });
  }
  // ---------------- Get Courses By Id ----------------------------------------
  GetCourseById(courseId: number): Observable<any>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    // Ajout du token dans le header de la réquête
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel de la méthode Http put UpdateCourse de l'API
    return this.http.get(`${this.GetCourseUrl}/${courseId}`, {headers});
  }
}
