import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoordinateService {
  private coordinatesSource = new BehaviorSubject<{ lat: number, lng: number } | null>(null);
  currentCoordinates = this.coordinatesSource.asObservable();

  constructor() {}

  updateCoordinates(lat: number, lng: number) {
    this.coordinatesSource.next({ lat, lng });
  }
}
