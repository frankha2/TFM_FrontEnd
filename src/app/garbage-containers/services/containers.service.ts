import { inject, Injectable } from "@angular/core";
import { ContainersResponse } from "../interfaces/containers-response.interface";
import { ContainerCreated } from "../interfaces/container-created.interface";
import { HttpClient } from "@angular/common/http";
import { CreateRoute, RouteOptimized } from "../interfaces/response-routes.interface";

@Injectable({
    providedIn: 'root',
})

export class ContainersService  {

    private _http: HttpClient = inject(HttpClient);

    getAllTest() {
        // return this.containers;
    }
    
    getOptimizedRoute(body: CreateRoute) {
        return this._http.post<RouteOptimized[]>('/api/v1/routes', body);
    }

    getAllContainers()  {
        return this._http.get<ContainersResponse[]>('/api/v1/containers');
    }

    getContainerById(id: string) {
        // return this.containers[0];
        return this._http.get<ContainersResponse>(`/api/v1/containers/${id}`);
    }

    createContainer(newContainer: ContainerCreated) {
        return this._http.post<ContainersResponse>('/api/v1/containers', newContainer);
    }

    editContainer(id: string, container: ContainerCreated) {
        return this._http.put<{message: string}>(`/api/v1/containers/${id}`, container)
    }

    deleteContainer(id: string) {
        return this._http.delete(`/api/v1/containers/${id}`);
    }

}