import { Component, inject, OnInit } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { ContainersResponse } from "../../interfaces/containers-response.interface";
import { ContainersService } from "../../services/containers.service";
import { CardModule } from "primeng/card";
import { DatePipe } from "@angular/common";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";

@Component({
    imports: [ ButtonModule, InputTextModule, TableModule, CardModule, DatePipe, IconFieldModule, InputIconModule ],
    selector: 'app-containers-list',
    templateUrl: './containers-list.component.html',
    styleUrl: './containers-list.component.scss'
})

export class ContainersListPageComponent implements OnInit {

    public containers_response: ContainersResponse[] = [];

    public containersService = inject(ContainersService);

    
    public get response() : ContainersResponse[] {
        return this.containers_response || [];
    }
    

    ngOnInit(): void {
        const response = this.containersService.getAll()

        this.containers_response = response;
    }
}