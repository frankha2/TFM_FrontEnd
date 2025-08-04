import { Component, inject, OnInit } from "@angular/core";
import { MapOptimizedRouteComponent } from "../../../shared/components/map-optimized-route/map-optimized-route.component";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { ContainersService } from "../../services/containers.service";
import { ContainersResponse } from "../../interfaces/containers-response.interface";
@Component({
    imports: [ CardModule, MapOptimizedRouteComponent, ButtonModule ],
    selector: 'app-optimized-routes-component',
    templateUrl: './optimized-routes.component.html',
    styleUrl: './optimized-routes.component.scss'
})

export class OptimizedRoutesComponent implements OnInit {

    public containersList: ContainersResponse[] = [];

    private http = inject(ContainersService); 

    ngOnInit(): void {
        const response = this.http.getAllTest()
        this.containersList = response;
    }

    recalculateRoute() {
        
        const response = this.http.getAllTest()
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