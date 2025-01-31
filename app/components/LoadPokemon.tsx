"use client"

import React, {useEffect, useState} from 'react'
import { useInView } from 'react-intersection-observer'
import { ClipLoader } from 'react-spinners'
import { fetchPokemon } from '../actions/getPokemon'
import { Pokemon } from '../types/types'
import { PokemonCard } from './PokemonCard'

export const LoadPokemon = ({search, initialPokemon}:{
    search?: string
    initialPokemon: Pokemon[] | undefined;
}) => {
    const [pokemon, setPokemon] = useState(initialPokemon);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false)

    const {inView, ref} = useInView();

    //helpers func

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


    const loadMorePokemon = async() => {
        setLoading(true)
        await delay(1000);

        const nextPage = page + 1

        const newPokemon = await fetchPokemon({search, page: nextPage,});

        setPage(nextPage)

        setPokemon((prev) => {
            if(!prev) return newPokemon
            const uniquePokemon = newPokemon.filter((poke: Pokemon) => !prev.some((p) => p.name === poke.name));

            return[...prev, ...uniquePokemon]
        });

        setLoading(false);
    }

    useEffect(() => {
        if(inView){
            loadMorePokemon();
        }
    }, [inView]);

  return (
    <>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-10'>
            {pokemon?.map((poke: Pokemon) => (
                <PokemonCard key={poke.url} pokemon={poke} />
            ))}
        </div>
    </>
  )
}
