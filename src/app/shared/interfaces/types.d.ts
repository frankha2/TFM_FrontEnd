import * as L from 'leaflet';
import 'leaflet-routing-machine';

declare module 'leaflet' {
    namespace Routing {
        interface ControlOptions {
            createMarket?: (i: number, waypoint: L.Routing.Waypoint, n:number) => L.Marker;
        }
    }
}