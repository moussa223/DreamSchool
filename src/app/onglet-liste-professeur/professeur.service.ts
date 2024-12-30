import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfesseurService {
  teacherModel: any = {
    teacherDto: {
      id: 0,
      lastName: '',
      firstName: '',
      email: '',
      nationality: '',
      cellPhone: '',
      phone: '',
      dateOfBirth: '',
      street: '',
      city: '',
      postalCode: '',
      country: '',
      courseIds: [
        0
      ]
    }
  };
  AddCourseToTeacherModel: any = {
    courseIds: [ 0 ]
  };
  private AddTeacherUrl = 'https://localhost:7012/api/Teacher/Create';
  private GetAllTeacherUrl = 'https://localhost:7012/api/Teacher/GetAllTeachers';
  private AddCourseToTeacherUrl = 'https://localhost:7012/api/Teacher/AddCoursesToTeacher';
  private DeleteCourseFromTeacherUrl = 'https://localhost:7012/api/Teacher/RemoveCoursesToTeacher';
  private UpdateTeacherUrl = 'https://localhost:7012/api/Teacher/Update';
  private DeleteTeacherUrl = 'https://localhost:7012/api/Teacher/Delete';
  //-------------------------------------------------------------------
  constructor(private http: HttpClient) { }
  //------------------------------------------------------------------
  // ------------------ Create Teacher -------------------------------
  CreateTeacher(){
    return this.http.post(this.AddTeacherUrl, this.teacherModel);
  }
  // --------------------------Get All Teachers------------------------
  getAllTeachers(): Observable<any[]>{
    return this.http.get<any[]>(`${this.GetAllTeacherUrl}`);
  }
  // ------------------------------------------------------------------
  // ----------------- Add Courses To Teacher ---------------------------
  AddToCoursesToTeacher(teacherId: number, courseIds: any): Observable<any>{
    const urlWithParam = `${this.AddCourseToTeacherUrl}?TeacherId=${teacherId}`;
    // Appel de la méthode Http put UpdateTeacher de l'API
    return this.http.post(urlWithParam,courseIds);
  }
  // ---------------- Delete Course To Teacher ------------------------------------
  DeleteCourseFromTeacher(teacherId: number, CourseId: any): Observable<any>{
    // Appel de la méthode Http put UpdateTeacher de l'API
    return this.http.delete(`${this.DeleteCourseFromTeacherUrl}/${teacherId}?CourseId=${CourseId}`);
  }
  // -----------------Update Teacher ------------------------------------
  UpdateTeacher(teacherId: number, updatedTeacherDto: any): Observable<any>{
    // Appel de la méthode Http put UpdateTeacher de l'API
    return this.http.put(`${this.UpdateTeacherUrl}/${teacherId}`, updatedTeacherDto);
  }
  // ---------------- Delete Teacher ------------------------------------
  DeleteTeacher(teacherId: number): Observable<any>{
    // Appel de la méthode Http put UpdateTeacher de l'API
    return this.http.delete(`${this.DeleteTeacherUrl}/${teacherId}`);
  }
  // -----------------------------------------------------------------
}
