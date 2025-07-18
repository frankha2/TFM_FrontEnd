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
    selector: 'app-containers-list',
    templateUrl: './containers-list.component.html',
    styleUrl: './containers-list.component.scss'
})

export class ContainersListPageComponent implements OnInit {

    public visibleCreated: boolean = false;

    private fb = inject(FormBuilder);

    formGroup!: FormGroup;

    public containers_response: ContainersResponse[] = [];

    public containersService = inject(ContainersService);
     private router = inject(Router);
    
    public get response() : ContainersResponse[] {
        return this.containers_response || [];
    }
    
    ngOnInit(): void {
        const response = this.containersService.getAllContainers()
        this.initForm();

        this.containers_response = response;
    }

    initForm() {
        this.formGroup = this.fb.group({
            latitude: ['', [Validators.required]],
            longitude: ['', [Validators.required]],
            capacity_liters: ['', [Validators.required]]
        });
    }

    openCreateContainerDialog() {
        this.visibleCreated = true;
    }

    // Este método se ejecuta cuando se envía el formulario y envia la petición para guardar el nuevo contenedor.
    onSubmit() {
        this.visibleCreated = false;
        const { latitude, longitude, capacity_liters } = this.formGroup.value;

        const data: ContainerCreated = {latitude: latitude, longitude: longitude, capacity_liters: capacity_liters};

        this.containersService.createContainer(data)
    }

    onReturnPage() {
        this.router.navigate(['/smartcity/containers/map-containers']);
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