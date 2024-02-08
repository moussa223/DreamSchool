import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EleveService {

  studentModel: any = {
    studentDto: {
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
      classRoomIds: [
        0
      ]
    }
  }
  AddClassRoomToStudentModel: any = {
    classRoomIds: [ 0 ]
  };
  DeleteClassRoomToStudentModel: any = {
    ClassRoomId: 0
  }

  private GetAllStudentUrl = 'https://localhost:7012/api/Student/GetAllStudents'; //  l'URL de l' API
  private AddStudentUrl = 'https://localhost:7012/api/Student/Create';
  private UpdateStudentUrl = 'https://localhost:7012/api/Student/Update';
  private DeleteStudentUrl = 'https://localhost:7012/api/Student/Delete';
  private AddClassRoomToStudentUrl = 'https://localhost:7012/api/Student/AddClassRoomsToStudent';
  private DeleteClassRoomFromStudentUrl = 'https://localhost:7012/api/Student/RemoveClassRoomsToStudent';

  constructor(private http: HttpClient) { }

  // -------------------- Get all Students ----------------------------------
  getAllStudents(): Observable<any[]>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.GetAllStudentUrl}`,{ headers });
  }
  // ------------------ Create Student --------------------------------
  CreateStudent(){
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel POST vers la route "register" de l'API
    return this.http.post(this.AddStudentUrl, this.studentModel, { headers });
  }
  // -----------------Update Student ------------------------------------
  UpdateStudent(studentId: number, updatedStudentDto: any): Observable<any>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    // Ajout du token dans le header de la réquête
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel de la méthode Http put UpdateStudent de l'API
    return this.http.put(`${this.UpdateStudentUrl}/${studentId}`, updatedStudentDto, {headers});
  }
  // ---------------- Delete Student ------------------------------------
  DeleteStudent(studentId: number): Observable<any>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    // Ajout du token dans le header de la réquête
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel de la méthode Http put UpdateStudent de l'API
    return this.http.delete(`${this.DeleteStudentUrl}/${studentId}`, {headers});
  }
  // ----------------- Add ClassRooms To Student ---------------------------
  AddClassRoomsToStudent(studentId: number, classRoomIds: any): Observable<any>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    // Ajout du token dans le header de la réquête
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    const urlWithParam = `${this.AddClassRoomToStudentUrl}?StudentId=${studentId}`;
    // Appel de la méthode Http put UpdateStudent de l'API
    return this.http.post(urlWithParam,classRoomIds, {headers});
  }
  // ---------------- Delete ClassRoom From Student ------------------------------------
  DeleteClassRoomFromStudent(studentId: number, ClassRoomId: any): Observable<any>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    // Ajout du token dans le header de la réquête
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel de la méthode Http put UpdateStudent de l'API
    return this.http.delete(`${this.DeleteClassRoomFromStudentUrl}/${studentId}?ClassRoomId=${ClassRoomId}`, {headers});
  }
  //


}
