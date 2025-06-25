import { Component, ViewChild } from "@angular/core";
import { GeneratedRouteComponent } from "../../components/generated-route/generated-route.component";
import { FilterRouteComponent } from "../../components/filter-route/filter-route.component";
import { FormGroup } from "@angular/forms";
import { FilterRoute } from "../../interfaces/filter-route.interface";

@Component({
    selector: 'app-search-route-page',
    templateUrl: './search-route-page.component.html',
    styleUrls: ['./search-route-page.component.scss'],
    imports: [GeneratedRouteComponent, FilterRouteComponent]
})

export class SearchRoutePageComponent {
    
    @ViewChild(GeneratedRouteComponent) search!: GeneratedRouteComponent;

    setFilter(filter: FilterRoute) {
        this.search.getOptimizedRoute(filter);
    }
}