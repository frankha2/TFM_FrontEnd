export interface ResponseRoutes {
    id:              string;
    location:        Location;
    capacity_liters: number;
    last_updated:    Date;
    created_at:      Date;
    updated_at:      Date;
}

export interface Location {
    latitude:  number;
    longitude: number;
}
