import { CharacterFetched } from "../interfaces/Character";


export const formatCharacterData = (characters:CharacterFetched[], additionalData:boolean=false) : Partial<CharacterFetched>[]=> {
    let minimalCharacterKeys: (keyof CharacterFetched)[] = ['id', 'name', 'image','species'];
    if(additionalData){
        minimalCharacterKeys = ['id', 'name', 'image','species','origin','status','episode','gender']
    }
    const formattedCharacters = characters.map(character => {
        const minimalCharacter: Partial<CharacterFetched> = {}; // Partial to allow missing keys
        minimalCharacterKeys.forEach((key:string) => {
            minimalCharacter[key] = character[key] as CharacterFetched[keyof CharacterFetched]
            if(key=='episode' && character[key].length>1){
                minimalCharacter[key] = [character[key][0]]
            }else if(key == 'origin' && character[key]){
                minimalCharacter[key] = {"name":character[key]['name']}
            }
        });
        return minimalCharacter;
    });
    return formattedCharacters;
}

export const calculatePaginationInfo = (pageNumber:number, pageSize:number) => {
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
