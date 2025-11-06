import { AfterViewInit, Component, inject, Input, OnInit } from "@angular/core";
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { ContainersResponse } from "../../../garbage-containers/interfaces/containers-response.interface";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { formatDate } from "@angular/common";
import { InputTextModule } from "primeng/inputtext";
import { PanelModule } from "primeng/panel";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { ContainerModalSharedComponent } from "../container-modal-shared/container-modal-shared.component";

@Component({
  imports: [ PanelModule, DialogModule, ButtonModule, InputTextModule ],
  selector: 'app-map-list-component',
  templateUrl: './map-list-containers.component.html',
  styleUrls: ['./map-list-containers.component.scss'],
  providers: [ DialogService ]
})

export class MapListContainersComponent implements OnInit, AfterViewInit {
  @Input() containersList!: ContainersResponse[];

  private map!: L.Map | undefined;
  private locations: any[] = [];
  
  // @ts-ignore
  ref: DynamicDialogRef | undefined;
  
  public dialogService = inject(DialogService);

  ngOnInit(): void {
    this.locations = this.containersList?.map((resp) => {
      return L.latLng(resp.location.latitude, resp.location.longitude);
    });
    
  }
  
  ngAfterViewInit(): void {
    this.initMap();
    this.showRoutes();
    this.fitMap();
  }
  // Inicializa el mapa. 
  private initMap(): void {
    this.map = L.map('map').setView([40.416929035485396, -3.698773731337271], 13);
    // Crea una capa de mapa base usando OpenStreetMap.
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://1938.com.es">Web Inteligencia Artificial</a>'
    }).addTo(this.map);

  }
  // Agrega las ubicaciones a mostrar en el mapa.
  private showRoutes(): void {
    // Crear una ruta para cada contenedor
    this.containersList.forEach((resp, i) => {
      const greenIcon = L.divIcon({ className: 'fa-solid fa-location-dot text-5xl text-primary-500 shadow-8' })

      const orangeIcon = L.divIcon({ className: 'fa-solid fa-location-dot text-5xl text-orange-500 shadow-4' })

      const redIcon = L.divIcon({ className: 'fa-solid fa-location-dot text-5xl text-red-500' })
      
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
  fitMap() {
    const latLngs = this.locations.map(loc => L.latLng(loc.lat, loc.lng));
    const bounds = L.latLngBounds(latLngs);

    this.map?.fitBounds(bounds);
  }

}