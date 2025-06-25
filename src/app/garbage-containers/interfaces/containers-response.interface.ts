export interface ContainersResponse {
    id: string;
    location: Locations;
    status: string;
    last_updated: string;
}

interface Locations {
    latitude: number;
    longitude: number;
}

// Status: num