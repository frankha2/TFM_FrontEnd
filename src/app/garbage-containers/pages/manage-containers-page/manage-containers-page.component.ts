import { Component, inject, OnInit, signal } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { ContainersService } from "../../services/containers.service";
import { CardModule } from "primeng/card";
import { CommonModule, DatePipe } from "@angular/common";
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { DialogModule } from "primeng/dialog";
import { ContainersResponse } from "../../interfaces/containers-response.interface";
import { Router } from "@angular/router";
import { Status, StatusItems } from "../../../shared/interfaces/status.interface";
import { SkeletonModule } from 'primeng/skeleton';
import { ContainerEditModalComponent } from "../../components/container-edit-modal/container-edit-modal.component";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { TooltipModule } from 'primeng/tooltip';
import { NewContainerComponent } from "../../components/new-container/new-container.component";
import { InputText } from "primeng/inputtext";
import { PanelModule } from "primeng/panel";
import { timeout } from "rxjs";

@Component({
    imports: [ 
        CommonModule, 
        ButtonModule, 
        TooltipModule,
        TableModule, 
        DialogModule, 
        SkeletonModule,
        PanelModule,
        CardModule, 
        DatePipe, 
        InputText,
        IconField, 
        InputIcon 
    ],
    providers: [ DialogService ],
    selector: 'app-manage-containers',
    templateUrl: './manage-containers-page.component.html',
    styleUrl: './manage-containers-page.component.scss'
})

export class ManageContainersPageComponent implements OnInit {

    public containers_response: ContainersResponse[] = [];
    public loading = signal<boolean>(false);
    
    public get response() : ContainersResponse[] {
        return this.containers_response || [];
    }

    // @ts-ignore
    ref: DynamicDialogRef | undefined;

    private router = inject(Router);
    public dialogService = inject(DialogService);
    private containersService = inject(ContainersService);
        
    ngOnInit(): void {
        this.loading.set(true);
        setTimeout(() => {
            this.loading.set(false);
        }, 1000);
        const response = this.containersService.getAllTest()
        this.containers_response = response;
    }

    onReturnPage() {
        this.router.navigate(['/smartcity/containers/map-containers']);
    }
    // Abre el modal para crear un nuevo contenedor.
    openCreateContainerModal() {
        this.ref = this.dialogService.open(NewContainerComponent, {
            header: 'Crear contenedor',
            baseZIndex: 10,
            contentStyle: { 'min-wdith': '600px', 'max-width': '600px', 'overflow': 'auto' },
            styleClass: 'col458',
            modal: true,
            closable: true,
        });
        this.ref.onClose.subscribe((containerCreated: any) => {
            console.log('Data from modal:', containerCreated);
            if (containerCreated && containerCreated.containerCreated) {

                this.containers_response.push({
                    id: 'new-id-' + (this.containers_response.length + 1),
                    location: {
                        latitude: containerCreated.containerCreated.latitude,   
                        longitude: containerCreated.containerCreated.longitude
                    },
                    capacity_liters: containerCreated.containerCreated.capacity_liters,
                    status: 'low',
                    last_fill_level: 0,
                    last_updated: new Date().toISOString(),
                    created_at: containerCreated.containerCreated.created_at.toISOString(),
                    updated_at: new Date().toISOString()
                });
            }
        });
    }

    // Abre el modal para editar el contenedor seleccionado.
    onOpenEditModal(id: string) {
        this.ref = this.dialogService.open(ContainerEditModalComponent, {
            header: 'Editar contenedor',
            baseZIndex: 10,
            contentStyle: { 'min-wdith': '600px', 'max-width': '600px', 'overflow': 'auto' },
            styleClass: 'col458',
            data: { id: id },
            modal: true,
            closable: true,
        });
    }
       
    // Elimina el contenedor seleccionado.
    deleteContainer(id: string) {
        this.containers_response = this.containers_response.filter(c => c.id !== id);
        // this.containersService.deleteContainer(id);
    }
    
}