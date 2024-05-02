import { CharacterFetched } from "../interfaces/Character";

export type CharacterResponse = {
    success: Boolean,
    message: String, 
    data: any,
};

export type AllCharactersFetched = {
    info:{
        count: number,
        pages: number,
        next: String | null, 
        prev: String | null
    },
    results: CharacterFetched[]
}

export type characterParamsType = {
    id:number
}