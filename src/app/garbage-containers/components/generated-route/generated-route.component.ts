import { Component, inject } from "@angular/core";
import { MapOptimizedRouteComponent } from "../../../shared/components/map-optimized-route/map-optimized-route.component";
import { FormGroup } from "@angular/forms";
import { RoutesService } from "../../services/routes.service";
import { FilterRoute } from "../../interfaces/filter-route.interface";

@Component({
    imports: [MapOptimizedRouteComponent],
    selector: 'app-generated-route',
    templateUrl: './generated-route.component.html',
    styleUrls: ['./generated-route.component.scss']
})

export class GeneratedRouteComponent {
    

    private routesGenerated = inject(RoutesService)

    getOptimizedRoute(filters: FilterRoute) {
        this.routesGenerated.calculateRoute(filters)
    }
}