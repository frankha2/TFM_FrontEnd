import { Component, inject, OnInit } from "@angular/core";
import { MapListContainersComponent } from "../../../shared/components/map-list-containers/map-list-containers.component";
import { ContainersResponse } from "../../interfaces/containers-response.interface";
import { ContainersService } from "../../services/containers.service";
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { TableModule } from "primeng/table";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
    imports: [ CommonModule, MapListContainersComponent, CardModule, TableModule,  PanelModule, ButtonModule ],
    selector: 'app-containers-list-map-page',
    templateUrl: './containers-list-map-page.component.html',
    styleUrls: ['./containers-list-map-page.component.scss']
})

export class ContainersListMapPageComponent implements OnInit {

    public containersList: ContainersResponse[] = [];

    private router = inject(Router);

    value: any[] = [
        {
            ruta: 'algo'
        }
    ]

    private http = inject(ContainersService); 

    ngOnInit(): void {
        const response = this.http.getAllContainers()
        this.containersList = response;
    }

    onShowRoute() {
        this.router.navigate(['/smartcity/containers/manage']);
    }

}