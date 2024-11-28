import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  CourseModel: any = {
    courseDto: {
      id: 0,
      name: "",
      code: "",
      description: "",
      hoursByWeek: 0,
      credits: 0,
      color: "",
      subject: "",
      type: ""
    }
  };

  private AddCourseUrl = 'https://localhost:7012/api/Course/Create';
  private GetAllCourses = 'https://localhost:7012/api/Course/GetAllCourses'; //  l'URL de l' API
  private GetCourseUrl = 'https://localhost:7012/api/Course/';
  private DeleteCourseUrl = 'https://localhost:7012/api/Course/Delete';

  constructor(private http: HttpClient) { }

  // ------------------ Create Course --------------------------------
  CreateCourse(){
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel POST vers la route "register" de l'API
    return this.http.post(this.AddCourseUrl, this.CourseModel, { headers });
  }
  // ----------------Get All Courses ----------------------------
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
  // ---------------- Delete Course ------------------------------------
  DeleteCourse(CourseId: number): Observable<any>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    // Ajout du token dans le header de la réquête
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel de la méthode Http put UpdateCourse de l'API
    return this.http.delete(`${this.DeleteCourseUrl}/${CourseId}`, {headers});
  }
}
