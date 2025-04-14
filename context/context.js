// context/context.js
"use client"
import { createContext, useState, useEffect } from "react"

export const genreContext = createContext()

export const GenreProvider = ({ children }) => {
    const [selectedGenres, setSelectedGenres] = useState([])
    const [filteredMovies, setFilteredMovies] = useState([])
    const [allMovies, setAllMovies] = useState([])


    useEffect(() => {
        const fetchAllMovieData = async () => {
            try {
                const allMOvieRes = await fetch('/api/movies')

                const Data = await allMOvieRes.json()

                setAllMovies(Data.response);
            } catch (err) {
                console.error("Error fetching movies:", err);
            }
        };
        fetchAllMovieData()
    }, [])


    return (
        <genreContext.Provider value={{ selectedGenres, setSelectedGenres, filteredMovies, setFilteredMovies, allMovies }}>
            {children}
        </genreContext.Provider>
    )
}