import { Component } from "@angular/core";
import { OptimizedRoutesComponent } from "../../components/optimized-routes/optimized-routes.component";
import { CardModule } from "primeng/card";
import { PanelModule } from "primeng/panel";

@Component({
    imports: [ OptimizedRoutesComponent, CardModule, PanelModule ],
    selector: 'app-optimized-routes-page',
    templateUrl: './optimized-routes-page.component.html',
    styleUrl: './optimized-routes-page.component.scss',
})

export class OptimizedRoutesComponentPage {}   