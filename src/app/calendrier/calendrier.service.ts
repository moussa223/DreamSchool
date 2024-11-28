import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendrierService {
  private PlanningUrl = 'https://localhost:7012/api/Planning'; // Change this to your API URL

  constructor(private http: HttpClient) { }
  getPlanningById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.PlanningUrl}/${id}`);
  }
}
