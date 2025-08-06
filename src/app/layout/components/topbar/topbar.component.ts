import { Component, inject, OnInit } from "@angular/core";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { Dialog } from "primeng/dialog";

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrl: './topbar.component.scss',
    imports: [ ButtonModule, RouterLink, RouterLinkActive, Dialog ]
})

export class Topbarcomponent implements OnInit {
    public visible: boolean = false;
    public imgUser: string = '';

    private router = inject(Router);

    ngOnInit(): void {
        this.imgUser = '/assets/icons/user-w.png'
    }

    porfile() {
        this.visible = true;
    }

    onLogOut() {
        this.visible = false;

        this.router.navigate(['/auth']);
    }
    
}