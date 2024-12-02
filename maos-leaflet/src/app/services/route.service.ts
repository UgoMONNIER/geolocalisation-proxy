import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private apiUrl = 'http://localhost:3000/directions'; // URL de ton backend

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer un itinéraire entre deux points
  getRoute(startLatitude: number, startLongitude: number, endLatitude: number, endLongitude: number): Observable<any> {
    const body = {
      startLatitude,
      startLongitude,
      endLatitude,
      endLongitude
    };
    return this.http.post<any>(this.apiUrl, body);  
  }
}
