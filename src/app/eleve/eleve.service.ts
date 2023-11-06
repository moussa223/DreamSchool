import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EleveService {

  private GetAllStudentUrl = 'https://localhost:7012/api/Student/GetAllStudents'; //  l'URL de l' API

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<any[]>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any[]>(`${this.GetAllStudentUrl}`,{ headers });
  }


}
