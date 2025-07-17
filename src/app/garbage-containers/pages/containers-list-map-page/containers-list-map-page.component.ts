import { Component, inject, OnInit } from "@angular/core";
import { MapListContainersComponent } from "../../../shared/components/map-list-containers/map-list-containers.component";
import { ContainersResponse } from "../../interfaces/containers-response.interface";
import { ContainersService } from "../../services/containers.service";
import { PanelModule } from 'primeng/panel';

@Component({
    imports: [ MapListContainersComponent, PanelModule ],
    selector: 'app-containers-list-map-page',
    templateUrl: './containers-list-map-page.component.html',
    styleUrls: ['./containers-list-map-page.component.scss']
})

export class ContainersListMapPageComponent implements OnInit {
    public containersList: ContainersResponse[] = [];

    private http = inject(ContainersService); 

    ngOnInit(): void {
        const response = this.http.getAllContainers()
        this.containersList = response;
    }
}