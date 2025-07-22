import { Component, inject, OnInit } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { ContainersService } from "../../services/containers.service";
import { CardModule } from "primeng/card";
import { CommonModule, DatePipe } from "@angular/common";
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { DialogModule } from "primeng/dialog";
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ContainersResponse } from "../../interfaces/containers-response.interface";
import { ContainerCreated } from "../../interfaces/container-created.interface";
import { Router } from "@angular/router";
import { Status, StatusItems } from "../../../shared/interfaces/status.interface";
import { ContainerEditModalComponent } from "../../components/container-edit-modal/container-edit-modal.component";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
    imports: [ 
        CommonModule, 
        ButtonModule, 
        InputTextModule, 
        ReactiveFormsModule,
        TableModule, 
        DialogModule, 
        CardModule, 
        DatePipe, 
        IconField, 
        InputIcon 
    ],
    providers: [ DialogService ],
    selector: 'app-manage-containers',
    templateUrl: './manage-containers-page.component.html',
    styleUrl: './manage-containers-page.component.scss'
})

export class ManageContainersPageComponent implements OnInit {

    public visibleCreated: boolean = false;

    public containers_response: ContainersResponse[] = [];

    public itemStatus: StatusItems[] = [
        { key: 1, value: Status.LOW },
        { key: 2, value: Status.MEDIUM },
        { key: 3, value: Status.HIGH }
    ];
    
    public get response() : ContainersResponse[] {
        return this.containers_response || [];
    }

    // @ts-ignore
    ref: DynamicDialogRef | undefined;

    public dialogService = inject(DialogService);
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private containersService = inject(ContainersService);
    
    public form!: FormGroup;     
    
    ngOnInit(): void {

        const response = this.containersService.getAllContainers()
        this.initForm();
        
        this.containers_response = response;
    }

    initForm() {
        this.form = this.fb.group({
            latitude: [null, [Validators.required]],
            longitude: [null, [Validators.required]],
            capacity_liters: [null, [Validators.required]],
            status: [1],
            created_at: [new Date()]
        });
    }

    openCreateContainerDialog() {
        this.visibleCreated = true;
    }

    // Este método se ejecuta cuando se envía el formulario y envia la petición para guardar el nuevo contenedor.
    onSubmit() {
        this.visibleCreated = false;
        const { latitude, longitude, capacity_liters, status, created_at } = this.form.value;

        const data: ContainerCreated = {latitude: latitude, longitude: longitude, capacity_liters: capacity_liters, status: status, created_at: created_at };

        this.containersService.createContainer(data)
        // .subscribe(({
        //     next: () => {
                
        //     },
        //     error: (error: HttpErrorResponse) => {
        //         console.error(error.error.message);
        //     }
        // }))
    }

    onReturnPage() {
        this.router.navigate(['/smartcity/containers/map-containers']);
    }

    //
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
       
    // 
    openContainerDetailsDialog(container: ContainersResponse) {
        // this.visible = true;
        // this.formGroup.patchValue({
        //     latitude: container.location.latitude,
        //     longitude: container.location.longitude
        // });
    }
    
}