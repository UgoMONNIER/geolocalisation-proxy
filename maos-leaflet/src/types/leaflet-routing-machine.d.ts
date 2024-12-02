import * as L from 'leaflet';

declare module 'leaflet' {
  namespace Routing {
    function control(options?: RoutingControlOptions): RoutingControl;

    function openrouteservice(apiKey: string): Router;

    interface RoutingControlOptions {
      waypoints?: L.LatLng[]; // Liste des points de passage
      routeWhileDragging?: boolean;
      geocoder?: any;
      router?: Router; // Ajoute la propriété `router`
    }

    interface RoutingControl {
      addTo(map: L.Map): this;
    }

    interface Router {
      route(waypoints: L.LatLng[], callback?: Function): void;
    }
  }

  namespace Control {
    export var Geocoder: {
      nominatim(): any;
    };
  }
}

export = L;
