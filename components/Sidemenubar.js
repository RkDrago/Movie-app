"use client"
import React, { useContext } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { genreContext } from '@/context/context'
import { useRouter } from 'next/navigation'

const Sidemenubar = () => {
    const pathname = usePathname();
    const { selectedGenres, setSelectedGenres } = useContext(genreContext)
    const router = useRouter()

    const categories = [
        "action", "adventure", "animation", "biography", "comedy", "crime",
        "documentary", "drama", "fantasy", "family", "history", "horror",
        "kids", "music", "mystery", "news", "reality", "romance",
        "sci-fi", "soap", "talk show", "thriller", "tv movie", "war",
        "war & politics", "western"
    ]

    const toggleGenre = (genre) => {
        setSelectedGenres(prev => prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]);
    };

    return (
        <>
            <section className='min-h-48 py-1 flex flex-col items-center gap-1.5'>
                <Link href={"/"} className={`text-[#111] text-[17px] opacity-70 hover:opacity-100 rounded-xl py-2 px-3 items-center gap-2 flex w-[80%] ${pathname === '/' ? 'bg-[#bebebe50] opacity-100 hover:bg-[#bebebe77]' : 'hover:bg-[#bebebe20]'}`}>
                    <img className='size-5' src={`${pathname === '/' ? '/icons/new1.png' : '/icons/new0.png'}`} alt="" />
                    New
                </Link>
                <Link href={"/popular"} className={`text-[#111] text-[17px] opacity-70 hover:opacity-100 rounded-xl py-2 px-3 items-center gap-2 flex w-[80%] ${pathname === '/popular' ? 'bg-[#bebebe50] opacity-100 hover:bg-[#bebebe77]' : 'hover:bg-[#bebebe20]'}`}>
                    <img className='size-5' src={`${pathname === '/popular' ? '/icons/popular1.png' : '/icons/popular0.png'}`} alt="" />
                    Popular
                </Link>
                <Link href={"/random"} className={`text-[#111] text-[17px] opacity-70 hover:opacity-100 rounded-xl py-2 px-3 items-center gap-2 flex w-[80%] ${pathname === '/random' ? 'bg-[#bebebe50] opacity-100 hover:bg-[#bebebe77]' : 'hover:bg-[#bebebe20]'}`}>
                    <img className='size-5' src="/icons/random.png" alt="" />
                    Random
                </Link>
                <Link href={"/collection"} className={`text-[#111] text-[17px] opacity-70 hover:opacity-100 rounded-xl py-2 px-3 items-center gap-2 flex w-[80%] ${pathname === '/collection' ? 'bg-[#bebebe50] opacity-100 hover:bg-[#bebebe77]' : 'hover:bg-[#bebebe20]'}`}>
                    <img className='h-[18px]' src={`${pathname === '/collection' ? '/icons/collection1.png' : '/icons/collection0.png'}`} alt="" />
                    Collection
                </Link>
            </section>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-black to-transparent opacity-10"></div>
            <section className="flex flex-col items-center gap-1.5 mt-2 py-3 h-[calc(100%-192px)] overflow-y-scroll [&::-webkit-scrollbar]:hidden">
                {Array.isArray(categories) && categories.map((category, index) => (
                    <button
                        onClick={() =>{router.push('/search-palette'); toggleGenre(category)}}
                        key={index}
                        href={`/${category}`}
                        className={`text-[#111] text-[12px] opacity-70 hover:opacity-100 rounded-full capitalize py-2 px-5 flex items-center gap-2 w-[80%] ${selectedGenres.includes(category) ? "bg-[#bebebe50] opacity-100 hover:bg-[#bebebe77]" : "hover:bg-[#bebebe20]"}`}>
                        {category}
                    </button>
                ))}
            </section>
        </>
    )
}
export default Sidemenubar
