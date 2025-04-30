import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  PaiementModel:any = {
    paiementDto: {
      id: 0,
      NomEleve:'',
      typeDeFrais: '',
      montantPaye: '',
      dateDePaiement: '',
      reference: '',
      periodScolaire: '',
      description: '',
      statut: '',
      commentaires: '',
      autres: ''

    }
  };
  private BaseUrl = "https://localhost:7012/api"

  constructor(private http: HttpClient) { }
  // --------------------------Get All Paiements------------------------
  getAllPaiements(): Observable<any[]>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.BaseUrl+'/Paiement/GetAllPaiements'}`,{ headers });
  }
  // ---------------------- Get Paiement By Id --------------------------
  GetPaiement(paiementId: number): Observable<any>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    // Ajout du token dans le header de la réquête
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel de la méthode Http put UpdatePaiement de l'API
    return this.http.get(`${this.BaseUrl+'/Paiement'}/${paiementId}`, {headers});
  }
  // ------------------ Create Paiement --------------------------------
  CreatePaiement(){
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel POST vers la route "register" de l'API
    return this.http.post(this.BaseUrl+'/Paiement/Create', this.PaiementModel, { headers });
  }
  // -----------------Update Paiement ------------------------------------
  UpdatePaiement(paiementId: number, updatedPaiementDto: any): Observable<any>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    // Ajout du token dans le header de la réquête
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel de la méthode Http put UpdatePaiement de l'API
    return this.http.put(`${this.BaseUrl+'/Paiement/Update'}/${paiementId}`, updatedPaiementDto, {headers});
  }
  // ---------------- Delete Paiement ------------------------------------
  DeletePaiement(paiementId: number): Observable<any>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    // Ajout du token dans le header de la réquête
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel de la méthode Http put UpdatePaiement de l'API
    return this.http.delete(`${this.BaseUrl+'/Paiement/Delete'}/${paiementId}`, {headers});
  }
}
