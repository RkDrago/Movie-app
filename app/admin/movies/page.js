'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [movieId, setMovieId] = useState('');
  const [originalMovieData, setOriginalMovieData] = useState('');
  const [movieData, setMovieData] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin");
    }
  }, [router]);

  const fetchMovie = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setEditMode(false);
    setDeleteMode(false);
    try {
      const res = await fetch(`/api/movies/${movieId}/search-movie`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Movie not found');
      const formatted = JSON.stringify(data, null, 2);
      setOriginalMovieData(formatted);
      setMovieData(formatted);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async () => {
    setError('');
    try {
      const res = await fetch(`/api/movies/${movieId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: movieData,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Update failed');
      setMessage('Movie updated successfully');
      setOriginalMovieData(movieData);
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    setError('');
    try {
      const res = await fetch(`/api/movies/${movieId}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Delete failed');
      setMessage('Movie deleted successfully');
      setMovieId('');
      setMovieData('');
      setOriginalMovieData('');
      setDeleteMode(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const hasChanges = movieData !== originalMovieData;

  return (
    <div className="bg-[#1111110e] min-h-[70svh] w-[80svw] mx-auto rounded-xl shadow-xl p-6 mt-10">
      <h1 className="capitalize text-4xl !font-bold styled-font text-center py-3 rounded-lg mb-6">
        UPDATE / DELETE posted Movies
      </h1>

      <form onSubmit={fetchMovie} className="bg-white max-w-md mx-auto p-6 rounded-md shadow-md space-y-4">
        <p className="text-gray-500 text-xs">Movie ID can be found in the URL when info of a movie is opened in the website.</p>
        <label className="block mb-1 text-sm font-medium">Provide Movie ID:</label>
        <input
          type="text"
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
          className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
          Search
        </button>
      </form>

      {movieData && (
        <div className="bg-white max-w-3xl mx-auto p-6 rounded-md shadow-md space-y-4 mt-6">
          <textarea
            value={movieData}
            onChange={(e) => setMovieData(e.target.value)}
            readOnly={!editMode}
            className={`min-w-full p-5 min-h-[300px] border rounded-md ${editMode ? 'bg-white' : 'bg-gray-100'}`}
          ></textarea>

          {error && <div className="text-red-600">{error}</div>}
          {message && <div className="text-green-600">{message}</div>}

          {!editMode && !deleteMode && (
            <>
              <button
                onClick={() => setEditMode(true)}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              >
                Edit Data
              </button>
              <button
                onClick={() => setDeleteMode(true)}
                className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
              >
                Delete Data
              </button>
            </>
          )}

          {editMode && (
            <div className="flex gap-2">
              <button
                onClick={handleUpdate}
                disabled={!hasChanges}
                className={`flex-1 py-2 rounded-md transition ${hasChanges ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
              >
                Update Data
              </button>
              <button
                onClick={() => {
                  setEditMode(false);
                  setMovieData(originalMovieData);
                }}
                className="flex-1 py-2 rounded-md bg-gray-500 hover:bg-gray-600 text-white"
              >
                Cancel
              </button>
            </div>
          )}

          {deleteMode && (
            <div className="flex gap-2">
              <button
                onClick={handleDelete}
                className="flex-1 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
              >
                Confirm Delete
              </button>
              <button
                onClick={() => setDeleteMode(false)}
                className="flex-1 py-2 rounded-md bg-gray-500 hover:bg-gray-600 text-white"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
