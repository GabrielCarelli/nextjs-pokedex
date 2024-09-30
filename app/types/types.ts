

export interface Pokemon{
    url: string
    name: string
}

export interface Ability{
    ability:{
        name: string;
    }
}

export interface PokemonData{
    height: number;
    weight: number;
    abilities: Ability[];
    types: {type:{name:string}} [];
    spritesUrl?: string;
}

export interface Props{
    pokemon: Pokemon;
}