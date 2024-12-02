import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { GeocodeService } from '../../services/geocode.service'; // Import geocode service
import { RouteService } from '../../services/route.service';

@Component({
  selector: 'app-formulaire-adresse',
  standalone: true,
  imports: [ReactiveFormsModule], // Import ReactiveFormsModule
  templateUrl: './formulaire-adresse.component.html',
  styleUrls: ['./formulaire-adresse.component.css']
})
export class FormulaireAdresseComponent {
  formulaire = new FormGroup({
    lieuPriseEnCharge: new FormControl('', [Validators.required]),
    lieuDestination: new FormControl('', [Validators.required])
  });




  @Output() coordinatesUpdated = new EventEmitter<[number, number, number, number]>();

  @Output() routeDataUpdated = new EventEmitter<any>();


  constructor(
    private geocodeService: GeocodeService,
    private routeService: RouteService
  ) { }

  /**
   * Submits the form and coordinates the geocoding process.
   */
  onSubmit() {
    if (this.formulaire.invalid) {
      console.error('Formulaire invalide');
      return;
    }

    const { lieuPriseEnCharge, lieuDestination } = this.formulaire.value;

    if (lieuPriseEnCharge && lieuDestination) {
      this.fetchCoordinates(lieuPriseEnCharge, lieuDestination);
    }
  }

  /**
   * Fetches coordinates for both addresses and emits the result.
   * @param lieuPriseEnCharge - Address for pickup
   * @param lieuDestination - Address for destination
   */
  private fetchCoordinates(lieuPriseEnCharge: string, lieuDestination: string) {
      this.getCoordinates(lieuPriseEnCharge, (priseEnChargeCoords) => {
        this.getCoordinates(lieuDestination, (destinationCoords) => {


          this.emitCoordinates(priseEnChargeCoords, destinationCoords);

          // -------------- RouteService Call --------------
          // Call RouteService to get the route information
          this.routeService.getRoute(
            priseEnChargeCoords[1], priseEnChargeCoords[0],
            destinationCoords[1], destinationCoords[0]
          ).subscribe({
            next: (routeData) => {
              this.routeDataUpdated.emit(this.routeService.decodeGeometry(routeData.routes[0].geometry));
            },
            error: (err) => console.error('Error fetching route data:', err)
          });
          // -------------- End RouteService Call --------------

        });
      });

      ;
  }

  /**
   * Fetches coordinates for a given address.
   * @param address - The address to geocode
   * @param callback - Function to handle the resulting coordinates
   */
  private getCoordinates(address: string, callback: (coords: [number, number]) => void) {
    this.geocodeService.getCoordinates(address).subscribe(
      (data) => {
        const coords = data?.features?.[0]?.geometry?.coordinates;
        if (coords && coords.length === 2) {
          callback([coords[0], coords[1]]);
        } else {
          console.error(`No valid coordinates found for address: ${address}`);
        }
      },
      (error) => console.error(`Error fetching coordinates for address: ${address}`, error)
    );
  }

  /**
   * Emits the final coordinates to the parent component.
   * @param priseEnChargeCoords - Coordinates for the pickup location
   * @param destinationCoords - Coordinates for the destination location
   */
  private emitCoordinates(
    priseEnChargeCoords: [number, number],
    destinationCoords: [number, number]
  ) {
    this.coordinatesUpdated.emit([
      priseEnChargeCoords[0],
      priseEnChargeCoords[1],
      destinationCoords[0],
      destinationCoords[1]
    ]);
  }




  // async geolocaliserEtRemplir(): Promise<void> {
  //   try {
  //     // Mise à jour du champ avec une valeur descriptive
  //     const locationText = `Geolocalisation en cours...`;
  //     if (this.formulaire && this.formulaire.get('lieuPriseEnCharge')) {
  //       this.formulaire.get('lieuPriseEnCharge')?.setValue(locationText);
  //     }
  //     const [latitude, longitude] = await this.geolocaliserUtilisateur();


  //     // Afficher les coordonnées si nécessaire
  //     console.log('Coordonnées:', latitude, longitude);
  //   } catch (error) {
  //     console.error('Erreur lors de la géolocalisation:', error);
  //   }
  // }

  // geolocaliserUtilisateur(): Promise<[number, number]> {
  //   return new Promise((resolve, reject) => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           const latitude = position.coords.latitude;
  //           const longitude = position.coords.longitude;
  //           console.log(latitude, longitude);
            
  //           resolve([latitude, longitude]);
  //         },
  //         (error) => {
  //           console.error('Erreur de géolocalisation:', error);
  //           reject(error);
  //         },
  //         {
  //           enableHighAccuracy: true
  //         }
  //       );
  //     } else {
  //       console.error('Géolocalisation non supportée par le navigateur.');
  //       reject(new Error('Géolocalisation non supportée par le navigateur.'));
  //     }
  //   });
  // }
  
}
