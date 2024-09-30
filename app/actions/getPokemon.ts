"use server"
export async function getPokemon({query, page = 1, limit = 15000}: 
    {
        query?: string, 
        page?:number,
        limit?: number
    }) {
    
        let apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(page - 1)*151}`

        try{
            const resp = await fetch(apiUrl)
            const data = await resp.json()

            if(query){
                const filteredPokemon = data.results.filter((pokemon:{name:string}) => 
                    pokemonNameStartsQuery(pokemon.name, query.toLowerCase()))
                return filteredPokemon.slice(0, 151)
            } else{
                return data.results.slice(0, 151)
            }
        }catch(error){
            console.log(error)
            return null;
        }

}
export async function pokemonNameStartsQuery(name: string, query: string){
    return name.toLowerCase().startsWith(query)
}

export async function fetchPokemon({page = 1, search}: {
    page?: number,
    search?: string | undefined,
}) {
    try{
        const pokemonData = await getPokemon({query: search, page})
        return pokemonData
    } catch(error){
        console.log(error)
    }
}