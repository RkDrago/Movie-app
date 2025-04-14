// Get watchlist from localStorage
export const getGuestWatchlist = () => {
    const data = localStorage.getItem('guestWatchlist');
    return data ? JSON.parse(data) : [];
  };
  
  // update movie object to watchlist
  export const saveToGuestWatchlist = (updatedList) => {
    localStorage.setItem('guestWatchlist', JSON.stringify(updatedList));
  };
  
  // Check if movie is already in watchlist
  export const isMovieInGuestWatchlist = (movieId) => {
    const currentList = getGuestWatchlist();
    return currentList.some((movie) => movie._id === movieId);
  };

  export const clearGuestWatchlist = () => {
    localStorage.removeItem('guestWatchlist');
  };
  