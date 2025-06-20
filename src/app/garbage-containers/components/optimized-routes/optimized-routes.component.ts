import { Component } from "@angular/core";
import { MapComponent } from "../../../shared/components/map/map.component";
import { CardModule } from "primeng/card";

@Component({
    imports: [ CardModule, MapComponent ],
    selector: 'app-optimized-routes-component',
    templateUrl: './optimized-routes.component.html',
    styleUrl: './optimized-routes.component.scss'
})

export class OptimizedRoutesComponent {}