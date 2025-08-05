import { Component, inject, OnInit, signal } from "@angular/core";
import { MapOptimizedRouteComponent } from "../../../shared/components/map-optimized-route/map-optimized-route.component";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { ContainersService } from "../../services/containers.service";
import { ContainersResponse } from "../../interfaces/containers-response.interface";
import { PanelModule } from "primeng/panel";
import { MapListContainersComponent } from "../../../shared/components/map-list-containers/map-list-containers.component";
@Component({
    imports: [ MapListContainersComponent, CardModule, MapOptimizedRouteComponent, ButtonModule, PanelModule ],
    selector: 'app-optimized-routes-component',
    templateUrl: './optimized-routes.component.html',
    styleUrl: './optimized-routes.component.scss'
})

export class OptimizedRoutesComponent implements OnInit {

    public containersList: ContainersResponse[] = [];
     public header: string = "Mapa";
     public routeOptimized = signal<boolean>(false); 

    private containerService = inject(ContainersService); 

    ngOnInit(): void {
        const response = this.containerService.getAllTest()
        this.containersList = response;
    }
    // Obtimiza la ruta de recolecta.
    onOptimizeRoute() {
        this.routeOptimized.set(true);
        const response = this.containerService.getAllTest()
        this.containersList = response;
        // .subscribe({
        //     next: (response) => {
        //         console.log('Route recalculated successfully:', response);
        //     }
        //     , error: (error) => {
        //         console.error('Error recalculating route:', error);
        //     }
        // });
    }
}