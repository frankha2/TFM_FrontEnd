import { Component, OnInit } from "@angular/core";
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { icon, Marker } from 'leaflet';

export const DEFAULT_LAT = 48.20807;
export const DEFAULT_LON =  16.37320;
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

    // options = {
    //     layers: [
    //     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //     })
    //     ],
    //     zoom: 13,
    //     center: L.latLng([14.0818, -87.2068]) // Coordenadas de ejemplo (Tegucigalpa)
    // };

    // layers: L.Layer[] = [];

    // ngOnInit(): void {
    //     this.drawGarbageRoutes();
    // }

    // drawGarbageRoutes(): void {
    //     const route1 = [
    //   [14.0850, -87.2000],
    //   [14.0860, -87.2050],
    //   [14.0870, -87.2100]
    // ];

    // const route2 = [
    //   [14.0750, -87.2150],
    //   [14.0760, -87.2200],
    //   [14.0770, -87.2250]
    // ];

    // // Crear polilíneas para las rutas
    // const polyline1 = L.polyline(route1 as L.LatLngExpression[], { color: 'blue' });
    // const polyline2 = L.polyline(route2 as L.LatLngExpression[], { color: 'red' });

    // // Añadir las polilíneas a las capas del mapa
    // this.layers.push(polyline1);
    // this.layers.push(polyline2);

    // // Puedes añadir marcadores para puntos de interés (ej. contenedores de basura)
    // const marker1 = L.marker([14.0850, -87.2000]).bindPopup('Punto de Recolección 1');
    // const marker2 = L.marker([14.0770, -87.2250]).bindPopup('Punto de Recolección 2');
    // this.layers.push(marker1);
    // this.layers.push(marker2);
    // }

     private map:any;
    lat: number = DEFAULT_LAT;
    lon: number = DEFAULT_LON;
    titulo: string = TITULO ;
 
    constructor() {
    }
    
    ngOnInit(): void {
        this.initMap();
  }
 
 
 
  private initMap(): void {
      //configuración del mapa
      this.map = L.map('map', {
        center: [this.lat, this.lon],
        attributionControl: false,
        zoom: 14
      });
 
      //iconos personalizados
      var iconDefault = L.icon({
        iconRetinaUrl,
        iconUrl,
        shadowUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      });
     L.Marker.prototype.options.icon = iconDefault;
 
      //titulo
      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://1938.com.es">Web Inteligencia Artificial</a>'
      });
 
      //marca con pop up
      const lon = this.lon + 0.009;
      const lat = this.lat + 0.009;
      const marker = L.marker([lat + 0.005, lon + 0.005]).bindPopup(this.titulo);
      marker.addTo(this.map);
 
      //marca forma de circulo
      const mark = L.circleMarker([this.lat, this.lon]).addTo(this.map);
      mark.addTo(this.map);
 
 
    //ruta
    L.Routing.control({
      router: L.Routing.osrmv1({
        serviceUrl: `https://router.project-osrm.org/route/v1/`
      }),
      showAlternatives: true,
      fitSelectedRoutes: false,
      show: false,
      routeWhileDragging: true,
      waypoints: [
        L.latLng(this.lat, this.lon),
        L.latLng(lat, lon)
      ]
    }).addTo(this.map);
      tiles.addTo(this.map);
    }
}