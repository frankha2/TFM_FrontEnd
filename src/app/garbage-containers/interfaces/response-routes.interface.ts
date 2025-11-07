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

export interface CreateRoute {
    start_point: StartPoint;
    statuses:    string[];
}

export interface StartPoint {
    latitude:  number;
    longitude: number;
}

export interface RouteOptimized {
    capacity_liters: number;
    created_at:      string;
    id:              string;
    last_fill_level: number;
    last_updated:    string;
    location:        Location;
    status:          string;
    updated_at:      string;
}

export interface Location {
    latitude:  number;
    longitude: number;
}
