'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const page = () => {
    const router = useRouter();
    const [movieData, setMovieData] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/admin");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        let parsedData;

        try {
            parsedData = JSON.parse(movieData); // Must be valid JSON
        } catch (err) {
            setError("Invalid JSON format. Please check your input.");
            return;
        }

        try {
            const res = await fetch('/api/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parsedData),
            });

            const result = await res.json();

            if (!res.ok) {
                setError(result.message || 'Failed to post movie data.');
            } else {
                setMessage(result.message || 'Movie data posted successfully!');
                setMovieData(''); // Reset textarea
            }
        } catch (err) {
            console.error("Error posting data:", err);
            setError("An unexpected error occurred.");
        }
    };

    return (
        <div className="bg-[#1111110e] min-h-[70svh] w-[80svw] mx-auto rounded-xl shadow-xl p-6 mt-10">
            <h1 className="capitalize text-4xl !font-bold styled-font text-center py-3 rounded-lg mb-6">
                Post New Movies
            </h1>
            <form
                className="bg-white max-w-3xl mx-auto p-6 rounded-md shadow-md space-y-4"
                onSubmit={handleSubmit}
            >
                <textarea
                    value={movieData}
                    onChange={(e) => setMovieData(e.target.value)}
                    className="min-w-full p-5 min-h-[300px] bg-white border border-gray-300 rounded-md"
                    placeholder='Paste your movie JSON data here.
             Example:
[
  {
    "title": "Inception",
    "releaseDate": "2010-07-16",
    "genre": "Sci-Fi"
  }
]'
                ></textarea>

                {error && <div className="text-red-600">{error}</div>}
                {message && <div className="text-green-600">{message}</div>}

                <button
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                    type="submit"
                >
                    Post Data
                </button>
            </form>
        </div>
    );
};

export default page;
