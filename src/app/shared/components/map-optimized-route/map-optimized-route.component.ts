import { AfterViewInit, Component, inject, Input, OnChanges, OnInit, signal, SimpleChanges } from "@angular/core";
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { ContainersResponse } from "../../../garbage-containers/interfaces/containers-response.interface";
import { PanelModule } from "primeng/panel";
import { formatDate } from "@angular/common";
import { DialogService } from "primeng/dynamicdialog";
import { ContainerModalSharedComponent } from "../container-modal-shared/container-modal-shared.component";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";

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
    imports: [ PanelModule, CardModule, ButtonModule ],
    providers: [ DialogService ]
})

export class MapOptimizedRouteComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() containersList!: ContainersResponse[];

  private map!: L.Map | undefined;
  private locations =  signal<any[]>([]);
  private polyline!:  L.Polyline;

  // @ts-ignore
  ref: DynamicDialogRef | undefined;

  public dialogService = inject(DialogService);
    
  ngOnInit(): void {
    this.locations.set(this.containersList?.map((resp) => {
      return L.latLng(resp.location.latitude, resp.location.longitude);
    }));
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['containersList'].previousValue && this.containersList.length > 0) {
      this.locations.set([]);
      this.onClearLastRoute();
    }
  }
  
  ngAfterViewInit(): void {
    this.initMap();
    this.showMap();
    // this.fitMap()
  }
 
  private initMap(): void {
    this.map = L.map('map').setView([40.416929035485396, -3.698773731337271], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.agregarUbicacion(e.latlng);
    });

  }

  onClearLastRoute() {
    this.map?.eachLayer((layer: any) => {
      console.log(layer)
      if( !layer._url ) {
        this.map?.removeLayer(layer);
      }
    });

    this.locations.set(this.containersList?.map((resp) => {
      return L.latLng(resp.location.latitude, resp.location.longitude);
    }));

    this.onOptimizeRoute();
  }

  onOptimizeRoute() {
    const waypoints = this.locations()?.map((point) => L.Routing.waypoint(point));

    this.containersList.forEach((resp, i) => {
      const { location } = resp;

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
            shadowSize: [41, 41],
          })
        
        }).bindPopup(`Punto de recogida ${ i + 1 }`);
      } 
      

    } as L.Routing.RoutingControlOptions).addTo(this.map!);
    })

    //ruta
    

    // this.map?.fitBounds();

  }

  private showMap(): void {
    // Crear una ruta para cada contenedor
    this.containersList.forEach((resp, i) => {

      const greenIcon = L.divIcon({ className: 'fa-solid fa-location-dot text-5xl text-primary-500 shadow-8' });

      const orangeIcon = L.divIcon({ className: 'fa-solid fa-location-dot text-5xl text-orange-500 shadow-4' });

      const redIcon = L.divIcon({ className: 'fa-solid fa-location-dot text-5xl text-red-500' });
      
      const { location } = resp;
      const marker = L.marker([location.latitude, location.longitude], { icon:  resp.status === 'high' ? redIcon : resp.status === 'medium' ? orangeIcon : greenIcon }).addTo(this.map!);
      marker.openTooltip().bindTooltip(`Ubicación ${ i + 1 }`);
      
      // Al hacer click en el marcador, se abre el modal con la información del contenedor.
      marker.on('click', () => {
        const date = formatDate(resp.last_updated, "short", "en-US"); 

        const containerSelected: ContainersResponse = {...resp, last_updated: date };

        this.ref = this.dialogService.open(ContainerModalSharedComponent, {
          header: `Punto de recogida ${ i + 1 }`,
          baseZIndex: 10,
          contentStyle: { 'min-wdith': '600px', 'max-width': '600px', 'overflow': 'auto' },
          styleClass: 'col458',
          data: { containerSelected: containerSelected },
          modal: true,
          closable: true,
        });
        
      });
    });
  }

  // Ajusta el mapa para que muestre todas las ubicaciones.
    // fitMap() {
    //   const latLngs = this.locations().map(loc => L.latLng(loc.lat, loc.lng));
    //   const bounds = L.latLngBounds(latLngs);
  
    //   this.map?.fitBounds(bounds);
    // }

  showDEtails() {
    
  }

  private agregarUbicacion(coordenada: L.LatLng): void {
    this.locations().push(coordenada);

    L.marker(coordenada).addTo(this.map!)
      .bindPopup(`Ubicación: ${this.locations.length}`)
      .openPopup();

      this.polyline.setLatLngs(this.locations());

      this.map!.panTo(coordenada)
  }
}