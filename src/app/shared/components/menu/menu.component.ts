import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss'
})

export class MenuComponent implements OnInit {

    public menuItems = [];

    ngOnInit(): void {
        // this.menuItems = [
        //     {
        //         icon: ''
        //     }
        // ]
    }
}