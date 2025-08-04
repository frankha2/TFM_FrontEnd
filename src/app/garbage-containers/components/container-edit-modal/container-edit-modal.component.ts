import { Component, inject, OnInit } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { ContainersService } from "../../services/containers.service";
import { ContainersResponse } from "../../interfaces/containers-response.interface";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { Status, StatusItems } from "../../../shared/interfaces/status.interface";
import { SelectModule } from "primeng/select";
import { ContainerCreated } from "../../interfaces/container-created.interface";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    imports: [ ReactiveFormsModule, ButtonModule, InputTextModule, SelectModule ],
    selector: 'app-container-edit-modal',
    templateUrl: './container-edit-modal.component.html',
    styleUrls: ['./container-edit-modal.component.scss']
})

export class ContainerEditModalComponent implements OnInit {

    public id!: string; 
    public visible: boolean = false;
    public containerData!: ContainersResponse;

    public itemStatus: StatusItems[] = [
        { key: 1, value: Status.LOW },
        { key: 2, value: Status.MEDIUM },
        { key: 3, value: Status.HIGH }
    ];

    private fb = inject(FormBuilder);
    public ref = inject(DynamicDialogRef);
    private config = inject(DynamicDialogConfig);
    private containersService = inject(ContainersService);

    form!: FormGroup;     

    ngOnInit(): void {
        this.id = this.config?.data?.id;

        this.onGetContainerById(this.id); 
        this.initForm();
    }

    initForm() {
        const { location, capacity_liters, status } = this.containerData;

        const statusId = status === 'low' ? 1 : status === 'medium' ? 2 : 3;

        const latitude: number = location.latitude;
        const longitude: number = location.longitude;
         
        this.form = this.fb.group({
            latitude: [latitude, Validators.required],
            longitude: [longitude, Validators.required],
            capacity_liters: [capacity_liters, Validators.required],
            status: [statusId, Validators.required]
        });
    }

    onGetContainerById(id: string) {
        const response = this.containersService.getContainerById(id);

        this.containerData = response;
    }

    onCloseModal() {
        this.ref.close();
    }

    onSubmit() {
        const { latitude, longitude, capacity_liters, status } = this.form.value;
        
        const data: ContainerCreated = {latitude: latitude, longitude: longitude, capacity_liters: capacity_liters, status: status };

        this.containersService.editContainer(data);
        // .subscribe(({
        //     next: () => {

        //     },
        //     error: (error: HttpErrorResponse) => {
        //         console.error(error.error.message);
        //     }
        // }))
        
        this.ref.close();
    }
}