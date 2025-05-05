import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {
  messageModel: any = {
    messageDto: {
      id: 0,
      titre: '',
      categorie: '',
      dateAjout: '',
      contenu: '',
      destinataire: '',
      statut: '',
      commentaires: '',
      autres: ''
    }
  };

  private GetAllMessageUrl = 'https://localhost:7012/api/Message/GetAllMessages'; //  l'URL de l'endpoint
  private GetMessageUrl = 'https://localhost:7012/api/Message';
  private AddMessageUrl = 'https://localhost:7012/api/Message/Create';
  private UpdateMessageUrl = 'https://localhost:7012/api/Message/Update';
  private DeleteMessageUrl = 'https://localhost:7012/api/Message/Delete';
  private SendMessageUrl = 'https://localhost:7012/api/Message/SendMessage';


  constructor(private http: HttpClient) { }

  // --------------------------Get All Messages------------------------
  getAllMessages(): Observable<any[]>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.GetAllMessageUrl}`,{ headers });
  }
  // ---------------------- Get Message By Id --------------------------
  GetMessage(messageId: number): Observable<any>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    // Ajout du token dans le header de la réquête
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel de la méthode Http put UpdateMessage de l'API
    return this.http.get(`${this.GetMessageUrl}/${messageId}`, {headers});
  }
  // ------------------ Create Message --------------------------------
  CreateMessage(){
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel POST vers la route "register" de l'API
    return this.http.post(this.AddMessageUrl, this.messageModel, { headers });
  }
  // -----------------Update Message ------------------------------------
  UpdateMessage(messageId: number, updatedMessageDto: any): Observable<any>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    // Ajout du token dans le header de la réquête
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel de la méthode Http put UpdateMessage de l'API
    return this.http.put(`${this.UpdateMessageUrl}/${messageId}`, updatedMessageDto, {headers});
  }
  // ---------------- Delete Message ------------------------------------
  DeleteMessage(messageId: number): Observable<any>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    // Ajout du token dans le header de la réquête
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel de la méthode Http put UpdateMessage de l'API
    return this.http.delete(`${this.DeleteMessageUrl}/${messageId}`, {headers});
  }
  // -------------------- Send Message -----------------------------------------

  SendMessage(message:any){
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel POST vers la route "register" de l'API
    return this.http.post(this.SendMessageUrl, message, { headers });
  }
  // -------------------------------------------------------------------------
}
