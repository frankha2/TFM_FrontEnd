import { Component, inject } from "@angular/core";
import { MapComponent } from "../../../shared/components/map/map.component";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { HttpClient } from "@angular/common/http";

@Component({
    imports: [ CardModule, MapComponent, ButtonModule ],
    selector: 'app-optimized-routes-component',
    templateUrl: './optimized-routes.component.html',
    styleUrl: './optimized-routes.component.scss'
})

export class OptimizedRoutesComponent {

    // private http = inject(HttpClient); 

    recalculateRoute() {
        // this.http.get().subscribe({
        //     next: (response) => {
        //         console.log('Route recalculated successfully:', response);
        //     }
        //     , error: (error) => {
        //         console.error('Error recalculating route:', error);
        //     }
        // });
    }
}