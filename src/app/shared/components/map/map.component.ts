import { Component, OnInit } from "@angular/core";
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { icon, Marker } from 'leaflet';

export const DEFAULT_LAT = 4.6497;
export const DEFAULT_LON =  -74.0808;
export const TITULO = 'Proyecto';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrl: './map.component.scss',
    imports: []
})

export class MapComponent implements OnInit {

  private map!: L.Map;
  private ubicaciones: L.LatLngExpression[] = [];
  private polyline!:  L.Polyline;
  // private map:any;
  // lat: number = DEFAULT_LAT;
  // lon: number = DEFAULT_LON;
  // titulo: string = TITULO ;

  // private recollectRoute: L.LatLngExpression[] = [
  //   [4.62947, -74.08364],
  //   [4.63199, -74.07982],
  //   [4.63020, -74.07648],
  //   [4.62917, -74.07339]
  // ]
    
  ngOnInit(): void {
    this.initMap();
  }
 
  private initMap(): void {
    //configuración del mapa
    // this.map = L.map('map', {
    //   center: [this.lat, this.lon],
    //   attributionControl: false,
    //   zoom: 14
    // });
 
    // //iconos personalizados
    // var iconDefault = L.icon({
    //   iconRetinaUrl,
    //   iconUrl,
    //   shadowUrl,
    //   iconSize: [25, 41],
    //   iconAnchor: [12, 41],
    //   popupAnchor: [1, -34],
    //   tooltipAnchor: [16, -28],
    //   shadowSize: [41, 41]
    // });
    // L.Marker.prototype.options.icon = iconDefault;
 
    // //titulo
    // const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   maxZoom: 19,
    //   attribution: '&copy; <a href="https://1938.com.es">Web Inteligencia Artificial</a>'
    // });
 
    // //marca con pop up
    // const lon = this.lon + 0.009;
    // const lat = this.lat + 0.009;
    // const marker = L.marker([lat + 0.005, lon + 0.005]).bindPopup(this.titulo);
    // marker.addTo(this.map);

    // //marca forma de circulo
    // const mark = L.circleMarker([this.lat, this.lon]).addTo(this.map);
    // mark.addTo(this.map);
 
 
    // //ruta
    // L.Routing.control({
    //   router: L.Routing.osrmv1({
    //     serviceUrl: `https://router.project-osrm.org/route/v1/`
    //   }),
    //   showAlternatives: true,
    //   fitSelectedRoutes: false,
    //   show: false,
    //   routeWhileDragging: true,
    //   waypoints: [
    //     L.latLng(this.lat, this.lon),
    //     L.latLng(lat, lon)
    //   ]
    // }).addTo(this.map);
    //   tiles.addTo(this.map);


    this.map = L.map('map').setView([4.62947, -74.08364], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://1938.com.es">Web Inteligencia Artificial</a>'
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.agregarUbicacion(e.latlng);
    });

    this.polyline = L.polyline([], {
      color: 'green',
      weight: 5,
      opacity: 0.7,
      smoothFactor: 1
    })
  }

  private agregarUbicacion(coordenada: L.LatLng): void {
    this.ubicaciones.push(coordenada);
    
    L.marker(coordenada).addTo(this.map)
      .bindPopup(`Ubicación: ${this.ubicaciones.length}`)
      .openPopup();

      this.polyline.setLatLngs(this.ubicaciones);

      this.map.panTo(coordenada)
  }
}