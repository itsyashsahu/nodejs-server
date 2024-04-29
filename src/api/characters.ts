import express from 'express';
import AxiosInstance from '../utils/axiosInstance';
import { CharacterFetched } from '../interfaces/Character';
import { AxiosResponse } from '../interfaces/AxiosResponse';

const router = express.Router();

type CharacterResponse = {
    success: Boolean,
    message: String, 
    data: any,
};

type AllCharactersFetched = {
    info:{
        count: Number,
        pages: Number,
        next: String | null, 
        prev: String | null
    },
    results: CharacterFetched[]
}

const formatCharacterData = (characters:CharacterFetched[]) : Partial<CharacterFetched>[]=> {
    const minimalCharacterKeys: (keyof CharacterFetched)[] = ['id', 'name', 'image', 'species'];
    const formattedCharacters = characters.map(character => {
        const minimalCharacter: Partial<CharacterFetched> = {}; // Partial to allow missing keys
        minimalCharacterKeys.forEach((key:string) => {
            minimalCharacter[key] = character[key] as CharacterFetched[keyof CharacterFetched]
        });
        return minimalCharacter;
    });
    return formattedCharacters;
}

router.get<{}, CharacterResponse>('/', async (req, res) => {
    try{
        const response: AxiosResponse<AllCharactersFetched> = await AxiosInstance.get("/character")
        const charactersFetched = response.data.results
        const minimalCharacters = formatCharacterData(charactersFetched)
        return res.json({
            success:true,
            message: "Successfully send data",
            data: minimalCharacters
        });
    }catch(e:any){
        return res.json({
            success:false,
            message: e.message ?? "",
            data: {}
        })
    }

});

export default router;
