import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {
  private apiUrl = 'http://localhost:3000/geocode'; // Your proxy server

  constructor(private http: HttpClient) {}

  getCoordinates(address: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { address });
  }
}
