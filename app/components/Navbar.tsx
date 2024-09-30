import React from 'react'

export const Navbar = () => {

  return (
    <div className=' flex justify-between items-center w-full h-20 px-4 text-white bg-gray-800 fixed-nav'>
        {/*Logo*/}
        <h1 className="text-2xl font-extrabold p-5 items-center"><a href='/'>Pokedex</a></h1>
    </div>
  )
}
