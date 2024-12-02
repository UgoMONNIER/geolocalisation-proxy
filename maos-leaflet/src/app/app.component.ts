import { Component } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet'; // Leaflet integration
import * as L from 'leaflet';
import { FormulaireAdresseComponent } from './components/formulaire-adresse/formulaire-adresse.component'; // Form component

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LeafletModule, FormulaireAdresseComponent], // Import necessary modules
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors',
      }),
    ],
    zoom: 13,
    center: L.latLng(43.5804, 7.1251), // Coordinates for Antibes, France
  };

  private map!: L.Map;

  onMapReady(map: L.Map) {
    this.map = map;
    console.log('Map is ready');
  }

  /**
   * Handles coordinates received from the form component and updates the map.
   */
  onCoordinatesUpdated(formData: [number, number, number, number]) {
    const [priseEnChargeLat, priseEnChargeLng, destinationLat, destinationLng] = formData;


    if (this.map) {
      this.map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
        }
      });

      L.marker([priseEnChargeLng, priseEnChargeLat])
        .addTo(this.map)
        .bindPopup('Point de départ')
        .openPopup();

      L.marker([destinationLng, destinationLat])
        .addTo(this.map)
        .bindPopup('Point d\'arrivée')

      
    }

  }

  onRouteDataUpdated(coordinates : any){
    const route = L.polyline(coordinates, { color: 'blue', weight: 6 }).addTo(this.map);
    this.map.fitBounds(route.getBounds());

  }
}
