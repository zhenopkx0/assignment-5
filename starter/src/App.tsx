import { Route, Routes } from "react-router-dom";
import {
  CareerView,
  CreditsView,
  EpisodesView,
  ErrorView,
  FavoritesView,
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
  SettingsView,
  TelevisionView,
  TrailerView,
  TrendingView,
  ViewTV,
} from "@/views/index";

export const App = () => {
  return (
    <Routes>
      <Route element={<HomeView />} path="/" />
      <Route element={<MainLayout />}>
        <Route path="/movies">
          <Route element={<MoviesView />} path="now-playing" />
          <Route element={<MoviesView />} path="popular" />
          <Route element={<MoviesView />} path="top-rated" />
          <Route element={<MoviesView />} path="upcoming" />
        </Route>
        <Route element={<SearchView />} path="/search" />
        <Route element={<PersonView />} path="/person/:id">
          <Route element={<CareerView />} path="career" />
          <Route element={<ImagesView />} path="images" />
        </Route>
        <Route element={<MovieView />} path="/movie/:id">
          <Route element={<CreditsView />} path="credits" />
          <Route element={<ReviewsView />} path="reviews" />
          <Route element={<TrailerView />} path="trailer" />
        </Route>
        <Route element={<ViewTV />} path="/tv/:id">
          <Route element={<SeasonsView />} path="seasons" />
          <Route element={<EpisodesView />} path="season/:season_number" />
          <Route element={<CreditsView />} path="credits" />
          <Route element={<ReviewsView />} path="reviews" />
          <Route element={<TrailerView />} path="trailer" />
        </Route>
        <Route path="/trending">
          <Route element={<TrendingView />} path="movie" />
          <Route element={<TrendingView />} path="tv" />
        </Route>
        <Route path="/tv">
          <Route element={<TelevisionView />} path="airing-today" />
          <Route element={<TelevisionView />} path="on-the-air" />
          <Route element={<TelevisionView />} path="popular" />
          <Route element={<TelevisionView />} path="top-rated" />
        </Route>
        <Route element={<GenreView />} path="/genre/:media/:genre"></Route>
        <Route element={<FavoritesView />} path="/favorites" />
        <Route element={<SettingsView />} path="/settings" />
      </Route>
      <Route element={<ErrorView />} path="*" />
    </Routes>
  );
};
