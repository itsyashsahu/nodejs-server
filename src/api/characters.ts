import express from 'express';
import AxiosInstance from '../utils/axiosInstance';
import { CharacterFetched, CharacterQueryParams } from '../interfaces/Character';
import { AxiosResponse } from '../interfaces/AxiosResponse';
import { Request } from 'express';
import { validateParams, validateQueryParameters } from '../middleware/utils';
import { AllCharactersFetched, CharacterResponse, characterParamsType } from '../types/characters';
import { characterParamsSchema, characterSchema } from '../schemas/character';
import { calculatePaginationInfo, formatCharacterData } from '../utils/character';
const router = express.Router();

router.get<{}, CharacterResponse>('/', validateQueryParameters(characterSchema), async (req:Request<{},CharacterResponse,{},CharacterQueryParams,{}>, res) => {
    try{
        const { page = 1, pageSize = 10, name = "",status="", species="", type="", gender="" }:CharacterQueryParams = req.query;
        let {startFetchPage, lastFetchPage, startingIndex, lastIndex} = calculatePaginationInfo(page, pageSize)
        
        const urlWithSearchParams = `/character?&name=${name}&status=${status}&species=${species}&type=${type}&gender=${gender}`
        const checkCountRes: AxiosResponse<AllCharactersFetched> = await AxiosInstance.get(urlWithSearchParams)
        const totalPagesInAPI = checkCountRes.data.info.pages
        const totalRecords = checkCountRes.data.info.count
        const totalPages = Math.ceil(totalRecords/pageSize)
        if( lastFetchPage > totalPagesInAPI){
            lastFetchPage = totalPagesInAPI
        }

        let fetchedCharacters:CharacterFetched[] = []
        while(startFetchPage<lastFetchPage){
            startFetchPage+=1
            const response: AxiosResponse<AllCharactersFetched> = await AxiosInstance.get(`${urlWithSearchParams}&page=${startFetchPage}`)
            fetchedCharacters.push(...response.data.results)
        }
        const minimalCharacters = formatCharacterData(fetchedCharacters.slice(startingIndex,lastIndex))

        return res.json({
            success:true,
            message: "Data send successfully",
            data: {
                info: {
                    currentPage: Number(page),
                    totalRecords,
                    totalPages
                },
                results:minimalCharacters
            }
        });
    }catch(e:any){
        if(e.response.status && e.response.status == 404){
            return res.json({
                success:true,
                message:"adsfasfd",
                data:{
                    info:{
                        currentPage:Number(1),
                        totalRecords:0,
                        totalPages:1
                    },
                    results:[]
                }
            })
        }
        return res.json({
            success:false,
            message: e.message ?? "",
            data: {}
        })
    }
});

router.get<characterParamsType, CharacterResponse>('/:id', validateParams(characterParamsSchema), async (req:Request<characterParamsType, CharacterResponse, {},{} > ,res )=>{
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
        const formattedCharacter = formatCharacterData(charactersFetched,true)[0]
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
