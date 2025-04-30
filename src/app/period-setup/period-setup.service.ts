import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PeriodSetupService {
  PeriodModel:any = {
    periodDto: {
      id: 0,
      anneeScolaire: '',
      className: '',
      montantAnnuel: '',
      dateLimiteTrimestre1: '',
      dateLimiteTrimestre2: '',
      dateLimiteTrimestre3: '',
      autres2: '',
      statut: '',
      commentaires: '',
      autres: ''
    }
  };
  private BaseUrl = "https://localhost:7012/api"

  constructor(private http: HttpClient) { }
  // --------------------------Get All Periods------------------------
  getAllPeriods(): Observable<any[]>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.BaseUrl+'/Period/GetAllPeriods'}`,{ headers });
  }
  // ---------------------- Get Period By Id --------------------------
  GetPeriod(periodId: number): Observable<any>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    // Ajout du token dans le header de la réquête
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel de la méthode Http put UpdatePeriod de l'API
    return this.http.get(`${this.BaseUrl+'/Period'}/${periodId}`, {headers});
  }
  // ------------------ Create Period --------------------------------
  CreatePeriod(){
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel POST vers la route "register" de l'API
    return this.http.post(this.BaseUrl+'/Period/Create', this.PeriodModel, { headers });
  }
  // -----------------Update Period ------------------------------------
  UpdatePeriod(periodId: number, updatedPeriodDto: any): Observable<any>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    // Ajout du token dans le header de la réquête
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel de la méthode Http put UpdatePeriod de l'API
    return this.http.put(`${this.BaseUrl+'/Period/Update'}/${periodId}`, updatedPeriodDto, {headers});
  }
  // ---------------- Delete Period ------------------------------------
  DeletePeriod(periodId: number): Observable<any>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    // Ajout du token dans le header de la réquête
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel de la méthode Http put UpdatePeriod de l'API
    return this.http.delete(`${this.BaseUrl+'/Period/Delete'}/${periodId}`, {headers});
  }
}
