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
import { Toast } from 'primeng/toast';
import { finalize } from "rxjs";
import { MessageService } from "primeng/api";

@Component({
    imports: [ ReactiveFormsModule, ButtonModule, InputTextModule, SelectModule, Toast ],
    selector: 'app-container-edit-modal',
    templateUrl: './container-edit-modal.component.html',
    styleUrls: ['./container-edit-modal.component.scss'],
    providers: [ MessageService ]
})

export class ContainerEditModalComponent implements OnInit {

    public id!: string; 
    public visible: boolean = false;
    public isLoading: boolean = false
    public containerData: ContainersResponse = {} as ContainersResponse

    public itemStatus: StatusItems[] = [
        { key: 1, value: Status.LOW },
        { key: 2, value: Status.MEDIUM },
        { key: 3, value: Status.HIGH }
    ];

    private fb = inject(FormBuilder);
    public ref = inject(DynamicDialogRef);

    private config = inject(DynamicDialogConfig);
    private messageService: MessageService = inject(MessageService)
    private containersService = inject(ContainersService);

    public form!: FormGroup;     

    ngOnInit(): void {
        this.id = this.config?.data?.id;

        this.initForm();
        this.onGetContainerById(); 
    }

    initForm() {
         
        this.form = this.fb.group({
            latitude: [null, [Validators.required]],
            longitude: [null, [Validators.required]],
            capacity_liters: [null, [Validators.required]],
            status: ['']
        });
    }

    onGetContainerById() {        
        this.isLoading = true

        this.containersService.getContainerById(this.id)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe({
            next: (response: ContainersResponse) => {
                                
                this.form.setValue({ 
                    latitude: response.location.latitude,
                    longitude:  response.location.longitude,
                    capacity_liters: response.capacity_liters,
                    status: response.status === 'high' ? 3 : response.status === 'medium' ? 2 : 1
                })
            },
            error: (error: HttpErrorResponse) => {
                console.error(error.error.message)
            }
        })

    }

    onCloseModal() {
        this.ref.close();
    }

    onSubmit() {
        const { latitude, longitude, capacity_liters } = this.form.value;
        
        const data: ContainerCreated = {latitude: latitude, longitude: longitude, capacity_liters: capacity_liters };

        this.containersService.editContainer(this.id, data)
        .subscribe(({
            next: (resp: {message: string}) => {

                this.ref.close({edited: true, message: resp.message});
            },
            error: (error: HttpErrorResponse) => {
                this.ref.close({edited: false, message: 'No se pudo editar el contenedor'})
                
            }
        }))
        
    }
}