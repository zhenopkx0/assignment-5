export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const MOVIE_ENDPOINT = "https://api.themoviedb.org/3/movie";
export const TV_ENDPOINT = "https://api.themoviedb.org/3/tv";

export const movieGenres = [
  { name: "Action", value: "action" },
  { name: "Adventure", value: "adventure" },
  { name: "Animation", value: "animation" },
  { name: "Crime", value: "crime" },
  { name: "Family", value: "family" },
  { name: "Fantasy", value: "fantasy" },
  { name: "History", value: "history" },
  { name: "Horror", value: "horror" },
  { name: "Mystery", value: "mystery" },
  { name: "Romance", value: "romance" },
  { name: "Science Fiction", value: "sci-fi" },
];

export const tvGenres = [
  { name: "Action", value: "action" },
  { name: "Animation", value: "animation" },
  { name: "Comedy", value: "comedy" },
  { name: "Crime", value: "crime" },
  { name: "Documentary", value: "documentary" },
  { name: "Drama", value: "drama" },
  { name: "Family", value: "family" },
  { name: "Kids", value: "kids" },
  { name: "Mystery", value: "mystery" },
  { name: "Science Fiction", value: "sci-fi" },
];

export const GENRE_MAP = {
  movies: {
    action: 28,
    adventure: 12,
    animation: 16,
    crime: 80,
    family: 10751,
    fantasy: 14,
    history: 36,
    horror: 27,
    mystery: 9648,
    romance: 10749,
    "sci-fi": 878,
  },
  tv: {
    action: 10759,
    animation: 16,
    comedy: 35,
    crime: 80,
    documentary: 99,
    drama: 18,
    family: 10751,
    kids: 10762,
    mystery: 9648,
    "sci-fi": 10765,
  },
};
