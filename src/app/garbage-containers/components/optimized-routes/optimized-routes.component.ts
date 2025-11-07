import { Component, inject, OnInit, signal } from "@angular/core";
import { MapOptimizedRouteComponent } from "../../../shared/components/map-optimized-route/map-optimized-route.component";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { ContainersService } from "../../services/containers.service";
import { ContainersResponse } from "../../interfaces/containers-response.interface";
import { PanelModule } from "primeng/panel";
import { HttpErrorResponse } from "@angular/common/http";
import { RouteOptimized } from "../../interfaces/response-routes.interface";
@Component({
    imports: [ CardModule, MapOptimizedRouteComponent, ButtonModule, PanelModule ],
    selector: 'app-optimized-routes-component',
    templateUrl: './optimized-routes.component.html',
    styleUrl: './optimized-routes.component.scss'
})

export class OptimizedRoutesComponent implements OnInit {

    public containersList =  signal<ContainersResponse[]>([]);
     public header: string = "Mapa";
     public routeOptimized = signal<boolean>(false); 

    private containerService = inject(ContainersService); 

    ngOnInit(): void {
        this.containerService.getAllContainers()
        .subscribe({
            next: (response) => {

                this.containersList.set(response);
            }, error: (error: HttpErrorResponse) => {
                console.error(error.error.message)
            }
        })
    }
    // Obtimiza la ruta de recolecta.
    onOptimizeRoute() {
        
        let data = {
            start_point: {
                latitude: this.containersList()[0].location.latitude,
                longitude: this.containersList()[0].location.longitude
            },
            statuses: [
                this.containersList()[0].status
            ]
        }

        this.containerService.getOptimizedRoute(data)
        .subscribe({
            next: (response: RouteOptimized[]) => {
                console.log(response);
                
                this.routeOptimized.set(true);
                this.containersList.set(response);
            }
            , error: (error) => {
                console.error('Error recalculating route:', error);
            }
        });
    }
}