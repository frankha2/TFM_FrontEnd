import { Component, inject, OnInit } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { ContainersResponse } from "../../interfaces/containers-response.interface";
import { ContainersService } from "../../services/containers.service";
import { CardModule } from "primeng/card";
import { CommonModule, DatePipe } from "@angular/common";
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { DialogModule } from "primeng/dialog";
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

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

    public visible: boolean = false;

    private fb = inject(FormBuilder);

    formGroup!: FormGroup;

    public containers_response: ContainersResponse[] = [];

    public containersService = inject(ContainersService);
    
    public get response() : ContainersResponse[] {
        return this.containers_response || [];
    }
    
    ngOnInit(): void {
        const response = this.containersService.getAll()
        this.initForm();

        this.containers_response = response;
    }

    initForm() {
        this.formGroup = this.fb.group({
            latitude: ['', [Validators.required]],
            longitude: ['', [Validators.required]],
        });
    }

    openCreateContainerDialog() {
        this.visible = true;
    }

    // Este método se ejecuta cuando se envía el formulario y envia la petición para guardar el nuevo contenedor.
    onSubmit() {
        this.visible = false;
        const { latitude, longitude } = this.formGroup.value;


    }

    openContainerDetailsDialog(container: ContainersResponse) {
        this.visible = true;
        this.formGroup.patchValue({
            latitude: container.location.latitude,
            longitude: container.location.longitude
        });
    }
    
}