import { inject, Injectable } from "@angular/core";
import { ContainersResponse } from "../interfaces/containers-response.interface";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class ContainersService {

    public containers: ContainersResponse[] = [
        {
            id: "uuid-del-contenedor-123",
            location: { latitude: 40.4167, longitude: -3.70325 },
            status: "medium",
            last_updated: "2023-10-27T10:00:00Z"
        }  
    ];

    private _http = inject(HttpClient);
    
    getAll() {
        // return this.containers;
        return this._http.get<ContainersResponse[]>(``)
    }
}