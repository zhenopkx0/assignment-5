import { useState } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  ButtonGroup,
  ImageGrid,
  Pagination,
  TrendingSubheader,
} from "@/components";
import { getImageUrl, type ImageCell, type MediaResponse } from "@/core";
import { useTmdb } from "@/hooks";

const TV_ENDPOINT = "https://api.themoviedb.org/3/trending/tv";
const MOVIE_ENDPOINT = "https://api.themoviedb.org/3/trending/movie";

export const TrendingView = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [page, setPage] = useState<number>(1);

  const ENDPOINT = pathname.includes("tv") ? TV_ENDPOINT : MOVIE_ENDPOINT;
  const goTo = pathname.includes("tv") ? "seasons" : "credits";

  const type = pathname.includes("tv") ? "tv" : "movie";

  const [searchParams, setSearchParams] = useSearchParams();
  const interval = searchParams.get("interval") || "day";
  const { data } = useTmdb<MediaResponse>(`${ENDPOINT}/${interval}`, {});

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.original_title,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div>
      <TrendingSubheader />
      <Outlet />
      <section className="mx-auto max-w-300 space-y-5 p-5">
        <ButtonGroup
          onClick={(value: string) => {
            setSearchParams({ interval: value });
          }}
          options={[
            { label: "Day", value: "day" },
            { label: "Week", value: "week" },
          ]}
          value={interval}
        />
        <ImageGrid
          images={gridData}
          onClick={(image) => navigate(`/${type}/${image.id}/${goTo}`)}
        />
        <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
      </section>
    </div>
  );
};
