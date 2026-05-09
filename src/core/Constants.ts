export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const MOVIE_ENDPOINT = "https://api.themoviedb.org/3/movie";
export const TV_ENDPOINT = "https://api.themoviedb.org/3/tv";

export const movieGenres = [
  { value: "action", name: "Action" },
  { value: "adventure", name: "Adventure" },
  { value: "animation", name: "Animation" },
  { value: "crime", name: "Crime" },
  { value: "family", name: "Family" },
  { value: "fantasy", name: "Fantasy" },
  { value: "history", name: "History" },
  { value: "horror", name: "Horror" },
  { value: "mystery", name: "Mystery" },
  { value: "romance", name: "Romance" },
  { value: "sci-fi", name: "Science Fiction" },
];

export const tvGenres = [
  { value: "action", name: "Action" },
  { value: "animation", name: "Animation" },
  { value: "comedy", name: "Comedy" },
  { value: "crime", name: "Crime" },
  { value: "documentary", name: "Documentary" },
  { value: "drama", name: "Drama" },
  { value: "family", name: "Family" },
  { value: "kids", name: "Kids" },
  { value: "mystery", name: "Mystery" },
  { value: "sci-fi", name: "Science Fiction" },
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
