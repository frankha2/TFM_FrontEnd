import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { ButtonModule } from "primeng/button";

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrl: './topbar.component.scss',
    imports: [ ButtonModule, RouterLink, RouterOutlet ]
})

export class Topbarcomponent {

    
}