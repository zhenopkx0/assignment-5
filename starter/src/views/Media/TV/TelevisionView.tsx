import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ImageGrid, Pagination, TVSubheader } from "@/components";
import { getImageUrl, type ImageCell, type TvResponse } from "@/core";
import { useTmdb } from "@/hooks";

const POPULAR_ENDPOINT = "https://api.themoviedb.org/3/tv/popular";
const ONTHEAIR_ENDPOINT = "https://api.themoviedb.org/3/tv/on_the_air";
const TOPRATED_ENDPOINT = "https://api.themoviedb.org/3/tv/top_rated";
const AIRINGTODAY_ENDPOINT = "https://api.themoviedb.org/3/tv/airing_today";

export const TelevisionView = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [page, setPage] = useState<number>(1);
  const ENDPOINT = pathname.includes("popular")
    ? POPULAR_ENDPOINT
    : pathname.includes("on-the-air")
    ? ONTHEAIR_ENDPOINT
    : pathname.includes("top-rated")
    ? TOPRATED_ENDPOINT
    : AIRINGTODAY_ENDPOINT;

  const { data } = useTmdb<TvResponse>(ENDPOINT, { page });

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.name,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div>
      <TVSubheader />
      <Outlet />
      <section className="mx-auto max-w-300 space-y-5 p-5">
        <ImageGrid
          images={gridData}
          onClick={(image) => navigate(`/tv/${image.id}/seasons`)}
        />
        <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
      </section>
    </div>
  );
};
