import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ImageGrid, LinkGroup, Pagination } from "@/components";
import type { ImageCell, MediaResponse } from "@/core";
import { GENRE_MAP, movieGenres, tvGenres } from "@/core/constants/constants";
import { useTmdb } from "@/hooks";

export const GenreView = () => {
  const { media, genre } = useParams();
  const { pathname } = useLocation();
  const MOVIES_ENDPOINT = "https://api.themoviedb.org/3/discover/movie";
  const TV_ENDPOINT = "https://api.themoviedb.org/3/discover/tv";
  const type = pathname.includes("tv") ? "tv" : "movie";
  const [page, setPage] = useState<number>(1);
  let genreId: number | undefined;
  const { data } = useTmdb<MediaResponse>(media === "movies" ? MOVIES_ENDPOINT : TV_ENDPOINT, { page, with_genres: genreId });

  if (media === "movies") {
    genreId = GENRE_MAP.movies[genre as keyof typeof GENRE_MAP.movies];
  }

  if (media === "tv") {
    genreId = GENRE_MAP.tv[genre as keyof typeof GENRE_MAP.tv];
  }

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: result.poster_path,
    primaryText: result.original_title ?? result.name,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-300 space-y-5 p-5">
      <LinkGroup
        options={[
          {
            label: "Movies",
            match: "genre/movies/:genre",
            to: "/genre/movies/action",
          },
          { label: "TV", match: "genre/tv/:genre", to: "/genre/tv/action" },
        ]}
      />
      {media === "movies" ? (
        <div>
          {movieGenres.map((genre) => (
            <Link key={genre.value} to={`/genre/movies/${genre.value}`}>
              {genre.name}
            </Link>
          ))}
        </div>
      ) : (
        <div>
          {tvGenres.map((genre) => (
            <Link key={genre.value} to={`/genre/tv/${genre.value}`}>
              {genre.name}
            </Link>
          ))}
        </div>
      )}
      <ImageGrid images={gridData} onClick={(id) => `/${type}/${id}`} />
      <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
    </section>
  );
};
