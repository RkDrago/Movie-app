import Image from "next/image";
import { useState, useEffect } from "react";

const LikeButton = ({ movieId }) => {
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        // Fetch like count from DB
        fetch(`/api/movies/${movieId}`)
            .then(res => res.json())
            .then(data => setLikes(data.likes))
            .catch(err => console.error("Error fetching likes:", err));

        // Check if user already liked this movie
        const likedMovies = JSON.parse(localStorage.getItem("likedMovies")) || [];
        if (likedMovies.includes(movieId)) {
            setLiked(true);
        }
    }, [movieId]);

    const handleLike = async () => {
        if (liked) return;

        try {
            const res = await fetch(`/api/movies/${movieId}/like`, {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });
            const data = await res.json();
            setLikes(data.likes);
            setLiked(true);

            // Store in localStorage
            const likedMovies = JSON.parse(localStorage.getItem("likedMovies")) || [];
            likedMovies.push(movieId);
            localStorage.setItem("likedMovies", JSON.stringify(likedMovies));
        } catch (error) {
            console.error("Error liking the movie:", error);
        }
    };

    return (
        <button
            onClick={handleLike}
            className="border border-[#58585878] bg-[#bebebe20] cursor-pointer flex justify-center items-center h-full px-3.5 rounded-full hover:bg-[#bebebe62]"
        >
            <Image
                 width={20} height={20}
                src={liked ? "/icons/like1.png" : "/icons/like0.png"}
                alt="like-icon"
            />
            <p className='pl-2 ml-2 border-l-2 border-[#58585878]'>{likes}</p>
        </button>
    );
};

export default LikeButton;
