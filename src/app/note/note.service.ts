import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  NoteModel: any = {
    NoteDto: {
      id: 0,
      date: '',
      total: '',
      noteObtenue: '',
      commentaires: '',
      autres: '',
      studentIds: [
        0 // Ex: si je remplace 0 par 1 , le premier cours de la liste sera selectionné par défaut
      ],
      courseIds: [
        0 // Ex: si je remplace 0 par 1 , le premier cours de la liste sera selectionné par défaut
      ]
    }
  };

  private GetNotesForStudentUrl = 'https://localhost:7012/api/Note/GetNotesForStudent';
  private GetNotesByIdUrl = 'https://localhost:7012/api/Note';
  private AddNoteUrl = 'https://localhost:7012/api/Note/Create';
  private GetAllNoteUrl = 'https://localhost:7012/api/Note/GetAllNotes'; //  l'URL de l'endpoint
  constructor(private http: HttpClient) { }
  // --------------------------Get All Notes------------------------
  getAllNotes(): Observable<any[]>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.GetAllNoteUrl}`,{ headers });
  }
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
  // ------------------ Create Note --------------------------------
  CreateNote(){
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel POST vers la route "register" de l'API
    return this.http.post(this.AddNoteUrl, this.NoteModel, { headers });
  }
}

