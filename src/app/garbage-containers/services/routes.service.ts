import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ResponseRoutes } from "../interfaces/response-routes.interface";
import { FilterRoute } from "../interfaces/filter-route.interface";

@Injectable({
    providedIn: 'root'
})

export class RoutesService {

    // private http =  inject(HttpClient);

    calculateRoute(routes: FilterRoute) {
        console.log(routes)
        // console.log('Calculating route with:', routes.value);
        // return this.http.post<ResponseRoutes>('http://192.168.13.102:8080/api/v1/containers', {
        //     latitude: routes.value.latitude,
        //     longitude: routes.value.longitude,
        //     status: routes.value.status 
        // });
    }
}