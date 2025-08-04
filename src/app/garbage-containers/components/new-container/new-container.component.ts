import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ContainerCreated } from "../../interfaces/container-created.interface";
import { ContainersService } from "../../services/containers.service";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { DynamicDialogRef } from "primeng/dynamicdialog";

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
            status: [1],
            created_at: [new Date()]
        });
    }

    onCloseModal() {
        this.ref.close();
    }

    // Este método se ejecuta cuando se envía el formulario y envia la petición para guardar el nuevo contenedor.
    onSubmit() {
        const { latitude, longitude, capacity_liters, status, created_at } = this.form?.value;

        const data: ContainerCreated = {latitude: latitude, longitude: longitude, capacity_liters: capacity_liters, status: status, created_at: created_at };

        this.containersService.createContainer(data)
        // .subscribe(({
        //     next: () => {
                
        //     },
        //     error: (error: HttpErrorResponse) => {
        //         console.error(error.error.message);
        //     }
        // }))
        this.ref.close({ containerCreated: data || null });
    }
}