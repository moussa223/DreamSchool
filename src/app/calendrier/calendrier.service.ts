import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendrierService {
  private PlanningUrl = 'https://localhost:7012/api/Planning'; // Change this to your API URL
  private GetAllPlanningUrl = 'https://localhost:7012/api/Planning/GetAllPlannings';
  private UpdatePlanningUrl = 'https://localhost:7012/api/Planning/Update';
  private DeletePlanningUrl = 'https://localhost:7012/api/Planning/Delete';

  constructor(private http: HttpClient) { }
  getPlanningById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.PlanningUrl}/${id}`);
  }
  // --------------------------Get All Plannings------------------------
  getAllPlannings(): Observable<any[]>{
    return this.http.get<any[]>(`${this.GetAllPlanningUrl}`);
  }
  //------------------------------------------------------------
  // -----------------Update Planning ------------------------------------
  UpdatePlanning(PlanningId: number, updatedPlanningDto: any): Observable<any>{
    // Appel de la méthode Http put UpdatePlanning de l'API
    return this.http.put(`${this.UpdatePlanningUrl}/${PlanningId}`, updatedPlanningDto);
  }
  //--------------------------------------------------
  // ---------------- Delete Planning ------------------------------------
  DeletePlanning(PlanningId: number): Observable<any>{
    // Récupérer le token depuis le local storage
    //const token = localStorage.getItem('usingsecretkeyforapp');
    // Ajout du token dans le header de la réquête
    //const headers = new HttpHeaders({
    //  Authorization: `Bearer ${token}`
    //});
    // Appel de la méthode Http put UpdatePlanning de l'API
    return this.http.delete(`${this.DeletePlanningUrl}/${PlanningId}`);
  }
}
