import { Component } from "@angular/core";
import { MapComponent } from "../../../shared/components/map/map.component";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";

@Component({
    imports: [ CardModule, MapComponent, ButtonModule ],
    selector: 'app-optimized-routes-component',
    templateUrl: './optimized-routes.component.html',
    styleUrl: './optimized-routes.component.scss'
})

export class OptimizedRoutesComponent {

    recalculateRoute() {
        
    }
}