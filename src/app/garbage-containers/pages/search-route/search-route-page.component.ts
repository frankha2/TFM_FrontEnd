import { Component } from "@angular/core";
import { GeneratedRouteComponent } from "../../components/generated-route/generated-route.component";
import { FilterRouteComponent } from "../../components/filter-route/filter-route.component";

@Component({
    selector: 'app-search-route-page',
    templateUrl: './search-route-page.component.html',
    styleUrls: ['./search-route-page.component.scss'],
    imports: [GeneratedRouteComponent, FilterRouteComponent]
})

export class SearchRoutePageComponent {
    // This component is used to display the generated route page.
    // It can be extended in the future to include more functionality.
    
    constructor() {
        // Initialization logic can go here if needed.
    }

    // Placeholder for future methods or properties related to the generated route page.
}