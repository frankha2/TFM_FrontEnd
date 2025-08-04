import { Component, inject, OnInit } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { ContainersResponse } from "../../../garbage-containers/interfaces/containers-response.interface";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";

@Component({
    imports: [ ButtonModule, InputTextModule ],
    selector: "app-container-modal-shared",
    templateUrl: "./container-modal-shared.component.html",
    styleUrls: ["./container-modal-shared.component.scss"],
})

export class ContainerModalSharedComponent implements OnInit {

    public containerSelected!: ContainersResponse; 

    private ref = inject(DynamicDialogRef);
    private config = inject(DynamicDialogConfig);

    ngOnInit(): void {
        this.containerSelected = this.config?.data?.containerSelected || {};
    }
    // Cierra el modal.
    onCloseModal() {
        this.ref.close();
    }
}