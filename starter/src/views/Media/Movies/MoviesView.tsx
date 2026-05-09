import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ImageGrid, Pagination, Subheader } from "@/components";
import type { ImageCell, MediaResponse } from "@/core";
import { useTmdb } from "@/hooks";

const NOWPLAYING_ENDPOINT = "https://api.themoviedb.org/3/movie/now_playing";
const POPULAR_ENDPOINT = "https://api.themoviedb.org/3/movie/popular";
const TOPRATED_ENDPOINT = "https://api.themoviedb.org/3/movie/top_rated";
const UPCOMINGENDPOINT = "https://api.themoviedb.org/3/movie/upcoming";

export const MoviesView = () => {
  const { pathname } = useLocation();
  const [page, setPage] = useState<number>(1);
  const ENDPOINT = pathname.includes("popular")
    ? POPULAR_ENDPOINT
    : pathname.includes("now-playing")
      ? NOWPLAYING_ENDPOINT
      : pathname.includes("top-rated")
        ? TOPRATED_ENDPOINT
        : UPCOMINGENDPOINT;

  const { data } = useTmdb<MediaResponse>(ENDPOINT, { page });

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: result.poster_path,
    primaryText: result.original_title,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div>
      <Subheader />
      <Outlet />
      <section className="mx-auto max-w-300 space-y-5 p-5">
        <ImageGrid images={gridData} onClick={(id) => `/movie/${id}`} />
        <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
      </section>
    </div>
  );
};
