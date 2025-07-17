import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { ContainersResponse } from "../../../garbage-containers/interfaces/containers-response.interface";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { DatePipe } from "@angular/common";

@Component({
  imports: [ DialogModule, ButtonModule, DatePipe ],
  selector: 'app-map-list-component',
  templateUrl: './map-list-containers.component.html',
  styleUrls: ['./map-list-containers.component.scss']
})

export class MapListContainersComponent implements OnInit, AfterViewInit {
  @Input() containersList!: ContainersResponse[];

  public displayDialog: boolean = false;
  public collectionPoint: number = 0;
  public containerSelected!: ContainersResponse | null;

  private map!: L.Map | undefined;
  private locations: any[] = [];
    
  ngOnInit(): void {
    this.locations = this.containersList?.map((resp) => {
      console.log(resp)
      return L.latLng(resp.location.latitude, resp.location.longitude);
    });
    
  }
  
  ngAfterViewInit(): void {
    this.initMap();
    this.showRoutes();
    this.fitMap();
  }
 
  private initMap(): void {
    this.map = L.map('map').setView([40.416929035485396, -3.698773731337271], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://1938.com.es">Web Inteligencia Artificial</a>'
    }).addTo(this.map);

  }

  private showRoutes(): void {
    //ruta
    this.containersList.forEach((resp, i) => {
      const greenIcon = L.divIcon({ className: 'fa-solid fa-location-dot text-5xl text-primary-500 shadow-8' })

      const orangeIcon = L.divIcon({ className: 'fa-solid fa-location-dot text-5xl text-orange-500 shadow-4' })

      const redIcon = L.divIcon({ className: 'fa-solid fa-location-dot text-5xl text-red-500' })
      
      const { location } = resp;
      const marker = L.marker([location.latitude, location.longitude], { icon:  resp.status === 'high' ? redIcon : resp.status === 'medium' ? orangeIcon : greenIcon }).addTo(this.map!);
      marker.openTooltip().bindTooltip(`Ubicación ${ i + 1 }`);
      
      marker.on('click', () => {
        this.collectionPoint = i + 1;
        this.containerSelected = resp;
        this.displayDialog = true;
      });
    
    });

  }

  fitMap() {
    const latLngs = this.locations.map(loc => L.latLng(loc.lat, loc.lng));
    const bounds = L.latLngBounds(latLngs);

    this.map?.fitBounds(bounds);
  }

}