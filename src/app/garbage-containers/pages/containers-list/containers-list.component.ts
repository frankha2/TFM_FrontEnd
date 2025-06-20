import { Component, inject, OnInit } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { ContainersResponse } from "../../interfaces/containers-response.interface";
import { ContainersService } from "../../services/containers.service";

@Component({
    imports: [ ButtonModule, InputTextModule, TableModule ],
    selector: 'app-containers-list',
    templateUrl: './containers-list.component.html',
    styleUrl: './containers-list.component.scss'
})

export class ContainersListPageComponent implements OnInit {

    public containers_response: ContainersResponse[] = [];

    public containersService = inject(ContainersService);

    ngOnInit(): void {
        const response = this.containersService.getAll()

        this.containers_response = response;
    }
}