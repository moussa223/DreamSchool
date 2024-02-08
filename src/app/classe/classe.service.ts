import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  classRoomModel: any = {
    classRoomDto: {
      id: 0,
      name: '',
      startDate: '',
      endDate: '',
      capacity: 0,
      levels: '',
      infos: '',
      courseIds: [
        0 // Ex: si je remplace 0 par 1 , le premier cours de la liste sera selectionné par défaut
      ]
    }
  };
  AddCourseToClassRoomModel: any = {
    courseIds: [ 0 ]
  };
  DeleteCourseToClassRoomModel: any = {
    CourseId: 0
  }
  private GetAllClassRoomUrl = 'https://localhost:7012/api/ClassRoom/GetAllClassRooms'; //  l'URL de l'endpoint
  private AddClassRoomUrl = 'https://localhost:7012/api/ClassRoom/Create';
  private UpdateClassRoomUrl = 'https://localhost:7012/api/ClassRoom/Update';
  private DeleteClassRoomUrl = 'https://localhost:7012/api/ClassRoom/Delete';
  private AddCourseToClassRoomUrl = 'https://localhost:7012/api/ClassRoom/AddCoursesToClassRoom';
  private DeleteCourseFromClassRoomUrl = 'https://localhost:7012/api/ClassRoom/RemoveCoursesToClassRoom';

  constructor(private http: HttpClient) { }

  // --------------------------Get All ClassRooms------------------------
  getAllClassRooms(): Observable<any[]>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.GetAllClassRoomUrl}`,{ headers });
  }
  // ------------------ Create ClassRoom --------------------------------
  CreateClassRoom(){
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel POST vers la route "register" de l'API
    return this.http.post(this.AddClassRoomUrl, this.classRoomModel, { headers });
  }
  // -----------------Update ClassRoom ------------------------------------
  UpdateClassRoom(classRoomId: number, updatedClassRoomDto: any): Observable<any>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    // Ajout du token dans le header de la réquête
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel de la méthode Http put UpdateClassRoom de l'API
    return this.http.put(`${this.UpdateClassRoomUrl}/${classRoomId}`, updatedClassRoomDto, {headers});
  }
  // ---------------- Delete ClassRoom ------------------------------------
  DeleteClassRoom(classRoomId: number): Observable<any>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    // Ajout du token dans le header de la réquête
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel de la méthode Http put UpdateClassRoom de l'API
    return this.http.delete(`${this.DeleteClassRoomUrl}/${classRoomId}`, {headers});
  }
  // ----------------- Add Courses To ClassRoom ---------------------------
  AddToCoursesToClassRoom(classRoomId: number, courseIds: any): Observable<any>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    // Ajout du token dans le header de la réquête
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    const urlWithParam = `${this.AddCourseToClassRoomUrl}?ClassRoomId=${classRoomId}`;
    // Appel de la méthode Http put UpdateClassRoom de l'API
    return this.http.post(urlWithParam,courseIds, {headers});
  }
  // ---------------- Delete ClassRoom ------------------------------------
  DeleteCourseFromClassRoom(classRoomId: number, CourseId: any): Observable<any>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    // Ajout du token dans le header de la réquête
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel de la méthode Http put UpdateClassRoom de l'API
    return this.http.delete(`${this.DeleteCourseFromClassRoomUrl}/${classRoomId}?CourseId=${CourseId}`, {headers});
  }
  //
}
