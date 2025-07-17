import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { ContainersResponse } from "../../../garbage-containers/interfaces/containers-response.interface";

export const DEFAULT_LAT = 4.6497;
export const DEFAULT_LON =  -74.0808;
export const TITULO = 'Proyecto';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png';
const shadowUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png';

@Component({
    selector: 'app-map-optimized-route',
    templateUrl: './map-optimized-route.component.html',
    styleUrl: './map-optimized-route.component.scss',
    imports: []
})

export class MapOptimizedRouteComponent implements OnInit, AfterViewInit {

  @Input() containersList!: ContainersResponse[];

  private map!: L.Map | undefined;
  private ubicaciones: any[] = [];
  private polyline!:  L.Polyline;
    
  ngOnInit(): void {
    this.ubicaciones = this.containersList?.map((resp) => {
      console.log(resp)
      return L.latLng(resp.location.latitude, resp.location.longitude);
    });
    
  }
  
  ngAfterViewInit(): void {
    this.initMap();
    this.showRoutes();
  }
 
  private initMap(): void {
    this.map = L.map('map').setView([40.416929035485396, -3.698773731337271], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://1938.com.es">Web Inteligencia Artificial</a>'
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      // this.agregarUbicacion(e.latlng);
    });

  }

  private showRoutes(): void {
    const waypoints = this.ubicaciones?.map((point) => L.Routing.waypoint(point));

    //ruta
    L.Routing.control({
      waypoints: waypoints,
      routeWhileDragging: true,
      addWaypoints: false,
      show: false,
      createMarker: (i: number, waypoints:  L.Routing.Waypoint, n: number) => {
        return L.marker(waypoints.latLng, {
          icon: L.icon({
            iconUrl: iconUrl,
            shadowUrl: shadowUrl,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })
        }).bindPopup(`Punto de recogida ${ i + 1 }`);
      } 

    } as L.Routing.RoutingControlOptions).addTo(this.map!);
  }

  showDEtails() {
    
  }

  private agregarUbicacion(coordenada: L.LatLng): void {
    this.ubicaciones.push(coordenada);
    
    L.marker(coordenada).addTo(this.map!)
      .bindPopup(`Ubicación: ${this.ubicaciones.length}`)
      .openPopup();

      this.polyline.setLatLngs(this.ubicaciones);

      this.map!.panTo(coordenada)
  }
}