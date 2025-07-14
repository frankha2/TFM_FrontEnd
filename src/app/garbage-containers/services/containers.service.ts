import { inject, Injectable } from "@angular/core";
import { ContainersResponse } from "../interfaces/containers-response.interface";
import { ContainerCreated } from "../interfaces/container-created.interface";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})

export class ContainersService  {
    
    public containers: ContainersResponse[] = [
        {
            id: "c7a1c7d6-3d2c-4e8d-9a6a-0b1e4c7b8e1a",
            location: {
                latitude: 40.416775,
                longitude: -3.70379
            },
            capacity_liters: 2400,
            status: "low",
            last_fill_level: 16,
            last_updated: "2025-06-24T04:33:47.432989Z",
            created_at: "2025-06-24T03:48:11.07833Z",
            updated_at: "2025-06-24T04:33:47.438207Z"
        },
        {
            id: "b8b2d8e7-4e3d-5f9e-a0b0-1c2f5d8e9f2b",
            location: {
                latitude: 40.417953,
                longitude: -3.714141
            },
            capacity_liters: 1100,
            status: "medium",
            last_fill_level: 76,
            last_updated: "2025-06-24T04:33:48.402194Z",
            created_at: "2025-06-24T03:48:11.07833Z",
            updated_at: "2025-06-24T04:33:48.404264Z"
        },
        {
            id: "a9c3e9f8-5f4e-6a0f-b1c1-2d3a6e9f0a3c",
            location: {
                latitude: 40.414436,
                longitude: -3.684439
            },
            capacity_liters: 2400,
            status: "low",
            last_fill_level: 17,
            last_updated: "2025-06-24T04:33:48.761448Z",
            created_at: "2025-06-24T03:48:11.07833Z",
            updated_at: "2025-06-24T04:33:48.763793Z"
        }
    ];

    // private _http = inject(HttpClient);

    getAllContainers() {
        return this.containers;
        // return this._http.get<ContainersResponse[]>(`http://192.168.13.102:8080/api/v1/containers`);
    }

    createContainer(newContainer: ContainerCreated) {

    //    return this._http.post('http://192.168.13.102:8080/api/v1/containers', newContainer);
    }

}