import polyline from '@mapbox/polyline';
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

  /**
   * Fonction pour décoder une géométrie Polyline et afficher l'itinéraire sur une carte Leaflet
   * @param {string} encodedGeometry - La géométrie encodée au format Polyline
   */
  decodeGeometry(encodedGeometry : string) {
    // Décoder la géométrie en coordonnées (latitude, longitude)
    return polyline.decode(encodedGeometry);
  
  }
  
}



