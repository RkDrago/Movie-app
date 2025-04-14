import express from 'express';
import { connectToDatabase } from '../lib/mongodb.js';
import Movie from '../models/Movie.js';
import { adminOnly, jwtAuthMiddleware } from '../jwt.js';

const router = express.Router();

// GET all movies
router.get('/', async (req, res) => {
    try {
        await connectToDatabase();

        // 🧠 Sorting by releaseDate DESCENDING (latest first)
        const movies = await Movie.find().sort({ releaseDate: -1 });

        res.status(200).json({ response: movies, message: "data fetched" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
});

router.get('/popular', async (req, res) => {
    try {
        await connectToDatabase();

        const movies = await Movie.find().sort({ rating: -1 }); // descending order

        res.status(200).json({
            response: movies,
            message: "Movies sorted by IMDb rating in ascending order fetched successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
});

router.get('/random', async (req, res) => {
    try {
        await connectToDatabase();

        const movies = await Movie.aggregate([{ $sample: { size: 10 } }]); // always returns 10 random movies

        res.status(200).json({
            response: movies,
            message: "Fetched 10 random movies"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch random movies' });
    }
});

// POST add movie(s)
router.post('/', async (req, res) => {
    try {
        await connectToDatabase();

        const data = req.body;
        let result;

        if (Array.isArray(data)) {
            // Filter out duplicates
            const filteredData = [];

            for (const movie of data) {
                const exists = await Movie.findOne({
                    title: movie.title,
                    releaseDate: movie.releaseDate
                });

                if (!exists) {
                    filteredData.push(movie);
                }
            }

            if (filteredData.length === 0) {
                return res.status(409).json({ message: 'All provided movies already exist' });
            }

            result = await Movie.insertMany(filteredData);
        } else {
            // Check for existing single movie
            const exists = await Movie.findOne({
                title: data.title,
                releaseDate: data.releaseDate
            });

            if (exists) {
                return res.status(409).json({ message: 'Movie already exists' });
            }

            const movie = new Movie(data);
            result = await movie.save();
        }

        res.status(201).json({ response: result, message: "Movie(s) added successfully" });
    } catch (err) {
        res.status(400).json({ error: 'Failed to create movie(s)', details: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ error: "Movie not found" });

        res.json({ likes: movie.likes });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});


router.post("/:id/like", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ error: "Movie not found" });

        movie.likes = (movie.likes || 0) + 1;
        await movie.save();

        res.json({ likes: movie.likes });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Get a movie by ID
router.get('/:id/search-movie', async (req, res) => {
    try {
        const searchMovie = await Movie.findById(req.params.id);
        if (!searchMovie) return res.status(404).json({ message: 'Movie not found' });
        res.json(searchMovie);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Update a movie by ID
router.put('/:id', async (req, res) => {
    try {
        const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updated) return res.status(404).json({ message: 'Movie not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: 'Update failed', error: err.message });
    }
});

// Delete a movie by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Movie.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Movie not found' });
        res.json({ message: 'Movie deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Delete failed', error: err.message });
    }
});




export default router;
