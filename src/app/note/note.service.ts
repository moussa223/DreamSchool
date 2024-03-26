import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private GetNotesForStudentUrl = 'https://localhost:7012/api/Note/GetNotesForStudent';
  private GetNotesByIdUrl = 'https://localhost:7012/api/Note';
  constructor(private http: HttpClient) { }

  // --------------- get Notes for Student By Student Id------------------------
  GetNotesForStudent(studentId: number): Observable<any>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    // Ajout du token dans le header de la réquête
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel de la méthode Http put UpdateNote de l'API
    return this.http.get(`${this.GetNotesForStudentUrl}/${studentId}`, {headers});
  }
  // -------------- Get Notes By Id ----------------------------
  GetNoteById(noteId: number): Observable<any>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    // Ajout du token dans le header de la réquête
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel de la méthode Http put UpdateNote de l'API
    return this.http.get(`${this.GetNotesByIdUrl}/${noteId}`, {headers});
  }
}

