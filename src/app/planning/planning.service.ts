import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {
  planningModel: any = {

    planningDto: {
      id: 0,
      name: '',
      statut: '',
      pdfFile: '',
      commentaires: '',
      autres: '',
      semaineDu: '',
      semaineAu: '',
      className: '',
      lundi8h: '',
      lundi9h: '',
      lundi10h: '',
      lundi11h: '',
      lundi12h: '',
      lundi13h: '',
      lundi14h: '',
      lundi15h: '',
      lundi16h: '',
      lundi17h: '',
      lundi18h: '',
      lundi19h: '',
      mardi8h: '',
      mardi9h: '',
      mardi10h: '',
      mardi11h: '',
      mardi12h: '',
      mardi13h: '',
      mardi14h: '',
      mardi15h: '',
      mardi16h: '',
      mardi17h: '',
      mardi18h: '',
      mardi19h: '',
      mercredi8h: '',
      mercredi9h: '',
      mercredi10h: '',
      mercredi11h: '',
      mercredi12h: '',
      mercredi13h: '',
      mercredi14h: '',
      mercredi15h: '',
      mercredi16h: '',
      mercredi17h: '',
      mercredi18h: '',
      mercredi19h: '',
      jeudi8h: '',
      jeudi9h: '',
      jeudi10h: '',
      jeudi11h: '',
      jeudi12h: '',
      jeudi13h: '',
      jeudi14h: '',
      jeudi15h: '',
      jeudi16h: '',
      jeudi17h: '',
      jeudi18h: '',
      jeudi19h: '',
      vendredi8h: '',
      vendredi9h: '',
      vendredi10h: '',
      vendredi11h: '',
      vendredi12h: '',
      vendredi13h: '',
      vendredi14h: '',
      vendredi15h: '',
      vendredi16h: '',
      vendredi17h: '',
      vendredi18h: '',
      vendredi19h: ''
    }
  };
  private PlanningUrl = 'https://localhost:7012/api/Planning'; // Change this to your API URL


  constructor(private http: HttpClient) { }

  CreatePlanning(){
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    /* const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    }); */
    // Appel POST vers la route "register" de l'API
    return this.http.post(`${this.PlanningUrl}/Create`, this.planningModel);
  }

  uploadPlanning(formData: FormData): Observable<any> {
    return this.http.post(`${this.PlanningUrl}/upload`, formData);
  }
}
