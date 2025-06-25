import { inject, Injectable } from "@angular/core";
import { ContainersResponse } from "../interfaces/containers-response.interface";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})

export class ContainersService  {

    public containers: ContainersResponse[] = [
        {
            id: "uuid-del-contenedor-123",
            location: { latitude: 40.4167, longitude: -3.70325 },
            status: "Lleno",
            last_updated: "2022-02-27"
        },
        {
            id: "oi-del-contenedor-123",
            location: { latitude: 40.4167, longitude: -3.70325 },
            status: "Medio",
            last_updated: "2023-03-27"
        },
        {
            id: "ed-del-contenedor-123",
            location: { latitude: 40.4167, longitude: -3.70325 },
            status: "Bajo",
            last_updated: "2024-10-27"
        } 
    ];

    // private _http = inject(HttpClient);
    
    getAll() {
        return this.containers;
        // return this._http.get<ContainersResponse[]>(``)
    }
}