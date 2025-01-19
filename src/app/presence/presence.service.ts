import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  seanceModel:any = {
    seanceDto: {
      id: 0,
      statut: '',
      commentaires: '',
      autres: '',
      name: '',
      date: '',
      heureDeDebut: '',
      heureDeFin: '',
      courseIds: [
        0 // Ex: si je remplace 0 par 1 , le premier cours de la liste sera selectionné par défaut
      ]
    }
  };
  // -------------------------------------
  PresenceModel:any = {
    presenceDto: {
      id: 0,
      statut: '',
      commentaires: '',
      autres: '',
      seanceIds: [
        0
      ],
      studentIds: [
        0
      ]
    }
  };

  private AddSeanceUrl = 'https://localhost:7012/api/Seance/Create';
  private GetAllSeanceUrl = 'https://localhost:7012/api/Seance/GetAllSeances'; //  l'URL de l'endpoint
  // --------------------------------  Presence -----------------------------
  private AddPresenceUrl = 'https://localhost:7012/api/Presence/Create';
  // --------------------------------------------------------------------
  constructor(private http: HttpClient) { }
  // ------------------ Create Seance --------------------------------
  CreateSeance(){
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel POST vers la route "register" de l'API
    return this.http.post(this.AddSeanceUrl, this.seanceModel, { headers });
  }
  // --------------------------Get All Seances------------------------
  getAllSeances(): Observable<any[]>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.GetAllSeanceUrl}`,{ headers });
  }
  // ------------------ Create Presence --------------------------------
  CreatePresence(){
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel POST vers la route "register" de l'API
    return this.http.post(this.AddPresenceUrl, this.PresenceModel, { headers });
  }
}
