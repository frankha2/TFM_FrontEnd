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
import { finalize, timeout } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { MessageService } from "primeng/api";
import { Toast } from "primeng/toast";
import { ContainerCreated } from "../../interfaces/container-created.interface";

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
        InputIcon,
        Toast
    ],
    providers: [ DialogService, MessageService ],
    selector: 'app-manage-containers',
    templateUrl: './manage-containers-page.component.html',
    styleUrl: './manage-containers-page.component.scss',
})

export class ManageContainersPageComponent implements OnInit {

    public containers_response: ContainersResponse[] = [];
    public loading = signal<boolean>(false);
    
    public get response() {
        return this.loading()
        ? Array.from({ length: 7 }).map(() => ({}))
        : this.containers_response.length > 0 
        ? this.containers_response 
        : [];
    }

    // @ts-ignore
    ref: DynamicDialogRef | undefined;

    private router = inject(Router);
    public dialogService = inject(DialogService);
    private messageService: MessageService = inject(MessageService)
    private containerService = inject(ContainersService);
        
    ngOnInit(): void {
        this.onGetContainers()
    }

    onGetContainers() {
        this.loading.set(true);

        this.containerService.getAllContainers()
        .pipe(finalize(() => this.loading.set(false)))
        .subscribe({
            next: (response) => {
                this.containers_response = response                
            },
            error: (error: HttpErrorResponse) => {
                console.error(error.error.message)
            }
        })
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
        this.ref.onClose.subscribe((containerCreated: ContainersResponse) => {
            if (containerCreated != null) {
                this.messageService.add({ severity: 'success', summary: 'Contenedor creado', detail: 'El contenedor fue creado correctamente' })
                this.onGetContainers()
            } else {
                this.messageService.add({ severity: 'error', summary: 'Error al crear', detail: 'No se pudo crear el contenedor' })
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
        this.ref.onClose.subscribe((response: {edited: boolean, message: string}) => {
            console.log(response);
            
            if (response.edited != true) {
                this.messageService.add({ severity: 'error', summary: 'Error al editar el contenedor', detail: `${response.message}` })
                this.onGetContainers()
            } else {

                this.messageService.add({ severity: 'success', summary: 'Contenedor editado', detail: `${response.message}` })
            }
        })
    }
       
    // Elimina el contenedor seleccionado.
    deleteContainer(id: string) {
        this.containerService.deleteContainer(id)
        .subscribe({
            next: (res) => {                
                this.messageService.add({ severity: 'success', summary: 'Contenedor eliminado', detail: 'Se elimino correctamente el contenedor' })
                this.onGetContainers()
            },
            error: (error: HttpErrorResponse) => {                
                this.messageService.add({ severity: 'error', summary: 'Error al eliminar', detail: 'No se pudo eliminar correctamente el contenedor' })
            }
        })
    }
    
}