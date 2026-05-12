import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ImageGrid, Link, LinkGroup, Pagination } from "@/components";
import { getImageUrl, type ImageCell, type MediaResponse } from "@/core";
import { GENRE_MAP, movieGenres, tvGenres } from "@/core/constants/constants";
import { useTmdb } from "@/hooks";

export const GenreView = () => {
  const navigate = useNavigate();
  const { media, genre } = useParams();
  const { pathname } = useLocation();
  const MOVIES_ENDPOINT = "https://api.themoviedb.org/3/discover/movie";
  const TV_ENDPOINT = "https://api.themoviedb.org/3/discover/tv";
  const type = pathname.includes("tv") ? "tv" : "movie";
  const [page, setPage] = useState<number>(1);
  let genreId: number | undefined;
  const goTo = pathname.includes("tv") ? "seasons" : "credits";

  if (media === "movies") {
    genreId = GENRE_MAP.movies[genre as keyof typeof GENRE_MAP.movies];
  }

  if (media === "tv") {
    genreId = GENRE_MAP.tv[genre as keyof typeof GENRE_MAP.tv];
  }

  const { data } = useTmdb<MediaResponse>(
    media === "movies" ? MOVIES_ENDPOINT : TV_ENDPOINT,
    { page, with_genres: genreId }
  );

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
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
      <ImageGrid
        images={gridData}
        onClick={(image) => navigate(`/${type}/${image.id}/${goTo}`)}
      />
      <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
    </section>
  );
};
