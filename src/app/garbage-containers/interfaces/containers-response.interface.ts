export interface ContainersResponse {
    id:              string;
    location:        Location;
    capacity_liters: number;
    status:          string;
    last_fill_level: number;
    last_updated:    string;
    created_at:      string;
    updated_at:      string;
}

export interface Location {
    latitude:  number;
    longitude: number;
}
