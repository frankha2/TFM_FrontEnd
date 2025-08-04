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
import { FilterMapComponent } from "../../components/filter-map/filter-map.component";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
    imports: [ 
        CommonModule, 
        MapListContainersComponent, 
        FilterMapComponent, 
        CardModule, 
        TableModule,  
        PanelModule, 
        ButtonModule 
    ],
    selector: 'app-containers-list-map-page',
    templateUrl: './containers-list-map-page.component.html',
    styleUrls: ['./containers-list-map-page.component.scss']
})

export class ContainersListMapPageComponent implements OnInit {

    public containersList: ContainersResponse[] = [];
    public filters: { level: number, status: string } = { level: 0, status: 'Todos' };
    public formFilters!: FormGroup;

    private router = inject(Router);
    private fb = inject(FormBuilder);
    private containerService = inject(ContainersService); 

    ngOnInit(): void {
        const response = this.containerService.getAllContainers(this.formFilters)
        this.containersList = response;

        this.onInitForm();
    }

    onInitForm() {
        this.formFilters = this.fb.group({
            level: [0],
            status: ['Todos']
        });


        this.formFilters.valueChanges.subscribe((value) => {

            this.containersList = this.containerService.getAllContainers(value);
        });
    }

    onGoToManageContainers() {
        this.router.navigate(['/smartcity/containers/manage']);
    }

    onStatusSelected( filterForm: FormGroup ) {
        this.formFilters.setValue({
            level: filterForm?.get('fillLevel')?.value,
            status: filterForm?.get('status')?.value
        });
    }

}