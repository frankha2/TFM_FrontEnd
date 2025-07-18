import { Component, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { Dialog } from "primeng/dialog";

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrl: './topbar.component.scss',
    imports: [ ButtonModule, RouterLink, Dialog ]
})

export class Topbarcomponent {
    public visible: boolean = false;

    private router = inject(Router);

    porfile() {
        this.visible = true;
    }

    logOut() {
        this.visible = false;

        this.router.navigate(['/auth']);
    }
    
}