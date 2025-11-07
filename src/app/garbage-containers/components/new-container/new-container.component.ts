import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ContainerCreated } from "../../interfaces/container-created.interface";
import { ContainersService } from "../../services/containers.service";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { HttpErrorResponse } from "@angular/common/http";
import { ContainersResponse } from "../../interfaces/containers-response.interface";

@Component({
    imports: [ ButtonModule, ReactiveFormsModule, InputTextModule ],
    selector: 'app-new-container',
    templateUrl: './new-container.component.html',
    styleUrls: ['./new-container.component.scss']
})

export class NewContainerComponent implements OnInit {

    form!: FormGroup;

    private fb = inject(FormBuilder);
    private ref = inject(DynamicDialogRef);
    private containersService = inject(ContainersService);

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.form = this.fb.group({
            latitude: [null, [Validators.required]],
            longitude: [null, [Validators.required]],
            capacity_liters: [null, [Validators.required]],
        });
    }

    onCloseModal() {
        this.ref.close();
    }

    // Este método se ejecuta cuando se envía el formulario y envia la petición para guardar el nuevo contenedor.
    onSubmit() {
        const { latitude, longitude, capacity_liters } = this.form?.value;

        const data: ContainerCreated = {latitude: latitude, longitude: longitude, capacity_liters: capacity_liters };

        this.containersService.createContainer(data)
        .subscribe(({
            next: (resp: ContainersResponse) => {
                
                this.ref.close(resp);
            },
            error: (error: HttpErrorResponse) => {
                this.ref.close(null);
            }
        }))
    }
}