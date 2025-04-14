import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String, // URL to the movie poster image
        required: true,
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
    },
    genre: {
        type: [String], // Array of genres
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    director: {
        type: String,
        required: true,
    },
    cast: {
        type: [String], // Array of actor names
        required: true,
    },
    likes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
