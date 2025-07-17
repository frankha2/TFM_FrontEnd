import { Component, inject } from "@angular/core";
import { RoutesService } from "../../services/routes.service";
import { FilterRoute } from "../../interfaces/filter-route.interface";

@Component({
    imports: [],
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