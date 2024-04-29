import express from 'express';
import AxiosInstance from '../utils/axiosInstance';
import { CharacterFetched } from '../interfaces/Character';
import { AxiosResponse } from '../interfaces/AxiosResponse';
import { Request, Response } from 'express';
import Joi from 'joi';
import { validateParams, validateQueryParameters } from '../middleware/utils';
const router = express.Router();

type CharacterResponse = {
    success: Boolean,
    message: String, 
    data: any,
};

type AllCharactersFetched = {
    info:{
        count: number,
        pages: number,
        next: String | null, 
        prev: String | null
    },
    results: CharacterFetched[]
}

interface CharacterQueryParams {
    page?: number;
    pageSize?: number;
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

const calculatePaginationInfo = (pageNumber:number, pageSize:number) => {
    const firstItemIndex:number = (pageNumber-1)*pageSize   // excluded
    const lastItemIndex: number = (pageNumber)*pageSize     // Included
    const startFetchPage:number = Math.floor(firstItemIndex/20)    // excluded
    const lastFetchPage:number = Math.ceil(lastItemIndex/20)    // Included

    const startingIndex:number = firstItemIndex - 20*(startFetchPage)
    const lastIndex:number = Number(startingIndex) + Number(pageSize)
    return {
        startingIndex,
        lastIndex,
        startFetchPage,
        lastFetchPage
    }
}

const schema = Joi.object({
    page: Joi.number().greater(0).default(1),
    pageSize: Joi.number().greater(0).default(10),
});

router.get<{}, CharacterResponse>('/', validateQueryParameters(schema), async (req:Request<{},CharacterResponse,{},CharacterQueryParams,{}>, res) => {
    try{
        const { page = 1, pageSize = 10 }:CharacterQueryParams = req.query;

        let {startFetchPage, lastFetchPage, startingIndex, lastIndex} = calculatePaginationInfo(page, pageSize)
        
        const checkCountRes: AxiosResponse<AllCharactersFetched> = await AxiosInstance.get(`/character`)
        const totalPages = checkCountRes.data.info.pages
        if( lastFetchPage > totalPages){
            lastFetchPage = totalPages
        }

        let fetchedCharacters:CharacterFetched[] = []
        while(startFetchPage<lastFetchPage){
            startFetchPage+=1
            const response: AxiosResponse<AllCharactersFetched> = await AxiosInstance.get(`/character?page=${startFetchPage}`)
            fetchedCharacters.push(...response.data.results)
        }
        const minimalCharacters = formatCharacterData(fetchedCharacters.slice(startingIndex,lastIndex))

        return res.json({
            success:true,
            message: "Data send successfully",
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


type ParamsSchema = {
    id:number
}
const paramsSchema = Joi.object({
    id: Joi.number().greater(0).default(1),
});
router.get<ParamsSchema, CharacterResponse>('/:id', validateParams(paramsSchema), async (req:Request<ParamsSchema, CharacterResponse, {},{} > ,res )=>{
    try{
        const {id:characterId} = req.params

        const checkRes: AxiosResponse<AllCharactersFetched> = await AxiosInstance.get(`/character`)
        const totalRecords = checkRes.data.info.count
        if( characterId > totalRecords){
            return res.json({
                success:false,
                message: `Invalid Id, Id must be less than ${totalRecords+1}`,
                data:{}
            })
        }
        const characterResponse: AxiosResponse<CharacterFetched> = await AxiosInstance.get(`/character/${characterId}`)
        const character:CharacterFetched = characterResponse.data
        const charactersFetched:CharacterFetched[] = [character]
        const formattedCharacter = formatCharacterData(charactersFetched)[0]
        return res.json({
            success:true,
            message: "Request Processed Successfully",
            data: formattedCharacter
        })
    }catch(e:any){
        return res.json({
            success:false,
            message: e.message ?? "",
            data: {}
        })
    }
})

export default router;
