"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
import { getGuestWatchlist, saveToGuestWatchlist } from '@/utils/localStorage'

const Right = ({ guestMovies, setGuestMovies }) => {
    const pathname = usePathname()

    const handleRemove = (movie) => {
        const currentList = getGuestWatchlist();
        let updatedList = currentList.filter((m) => m._id !== movie._id);

        saveToGuestWatchlist(updatedList);
        setGuestMovies(updatedList); // ✅ Update state to trigger re-render
    };

    return (
        <>
            <div className="pr-16 py-2 flex flex-col gap-2">
                <h3 className='text-lg'>A Home for Movie Lovers</h3>
                <p className='text-xs'>Discover here what to watch next. Newest, Popular and of different Genres </p>
            </div>
            <div className="h-[1px] w-full my-2 bg-gradient-to-r from-transparent via-[#3a3a3aae] to-transparent opacity-40"></div>
            <div className={`collection-tab ${pathname === '/collection' ? "hidden" : "block"}`}>
                <h1 className='text-lg py-2'>Collection</h1>
                <div className="max-h-[34svh] w-full grid grid-cols-3 items-center overflow-y-scroll [&::-webkit-scrollbar]:hidden">
                    {guestMovies.map((movie, idx) => (
                        <div key={idx} className="overflow-hidden group h-[115px] w-[90px] mx-auto rounded-lg my-1 relative">
                            <img src={movie.image} alt="" />
                            <div onClick={(e) => { handleRemove(movie) }} className="absolute top-1 right-1 text-white text-xs bg-[#111111d9] opacity-60 hover:opacity-100 h-[17px] w-[17px] cursor-pointer group-hover:block hidden rounded-full text-center">✕</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='bg-green-200 h-[38%] m-2'>
                
            </div>
        </>
    )
}

export default Right
