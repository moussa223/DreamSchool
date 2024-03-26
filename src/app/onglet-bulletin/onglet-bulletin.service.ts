import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OngletBulletinService {

  bulletinModel: any = {
    bulletinDto: {
      id: 0,
      titre: '',
      date: '',
      rang: '',
      moyenne: '',
      remarque: '',
      autres: '',
      courseIds: [
        0
      ],
      noteIds: [
        0
      ],
      studentIds: [
        0
      ]
    }
  };

  private AddBulletinUrl = 'https://localhost:7012/api/Bulletin/Create';
  private GetAllBulletinUrl = 'https://localhost:7012/api/Bulletin/GetAllBulletins'

  constructor(private http:HttpClient) { }
  // ------------------ Create Bulletin --------------------------------
  CreateBulletin(){
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel POST vers la route "register" de l'API
    return this.http.post(this.AddBulletinUrl, this.bulletinModel, { headers });
  }

 // ------------------ Get All Bulletins -------------------------------
  getAllBulletins(): Observable<any[]>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.GetAllBulletinUrl}`,{ headers });
  }
}
