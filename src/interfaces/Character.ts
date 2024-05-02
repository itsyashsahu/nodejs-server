interface CharacterOrigin {
    name: string;
    url?: string;
}

interface CharacterLocation {
    name: string;
    url: string;
}

export interface CharacterFetched {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: CharacterOrigin;
    location: CharacterLocation;
    image: string;
    episode: string[];
    url: string;
    created: string;
}

export interface CharacterQueryParams {
    page?: number;
    pageSize?: number;
    name?: string;
    status?:string;
    species?:string;
    type?:string;
    gender?:string;
}