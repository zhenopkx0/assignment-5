import { Route, Routes } from "react-router-dom";
import {
  CareerView,
  CreditsView,
  EpisodesView,
  ErrorView,
  GenreView,
  HomeView,
  ImagesView,
  MainLayout,
  MoviesView,
  MovieView,
  PersonView,
  ReviewsView,
  SearchView,
  SeasonsView,
  TelevisionView,
  TrailerView,
  TrendingView,
  ViewTV,
} from "@/Views/index";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route element={<MainLayout />}>
        <Route path="/movies">
          <Route path="now-playing" element={<MoviesView />} />
          <Route path="popular" element={<MoviesView />} />
          <Route path="top-rated" element={<MoviesView />} />
          <Route path="upcoming" element={<MoviesView />} />
        </Route>
        <Route path="/search" element={<SearchView />} />
        <Route path="/person/:id" element={<PersonView />}>
          <Route path="career" element={<CareerView />} />
          <Route path="images" element={<ImagesView />} />
        </Route>
        <Route path="/movie/:id" element={<MovieView />}>
          <Route path="credits" element={<CreditsView />} />
          <Route path="reviews" element={<ReviewsView />} />
          <Route path="trailer" element={<TrailerView />} />
        </Route>
        <Route path="/tv/:id" element={<ViewTV />}>
          <Route path="seasons" element={<SeasonsView />} />
          <Route path="season/:season_number" element={<EpisodesView />} />
          <Route path="credits" element={<CreditsView />} />
          <Route path="reviews" element={<ReviewsView />} />
          <Route path="trailer" element={<TrailerView />} />
        </Route>
        <Route path="/trending">
          <Route path="movie" element={<TrendingView />} />
          <Route path="tv" element={<TrendingView />} />
        </Route>
        <Route path="/tv">
          <Route path="airing-today" element={<TelevisionView />} />
          <Route path="on-the-air" element={<TelevisionView />} />
          <Route path="popular" element={<TelevisionView />} />
          <Route path="top-rated" element={<TelevisionView />} />
        </Route>
        <Route path="/genre/:media/:genre" element={<GenreView />}></Route>
      </Route>
      <Route path="*" element={<ErrorView />} />
    </Routes>
  );
};
