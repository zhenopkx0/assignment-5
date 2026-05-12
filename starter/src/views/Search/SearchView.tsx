import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ImageGrid, Pagination } from "@/components";
import { getImageUrl, type ImageCell } from "@/core";
import { useTmdb } from "@/hooks";

type SearchResponse = {
  results: Array<{
    id: number;
    name: string;
    original_title: string;
    original_name: string;
    poster_path: string | null;
    profile_path: string | null;
  }>;
  total_pages: number;
  total_results: number;
};

export const SearchView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const type = searchParams.get("type") ?? "movie";
  const endpoint = `https://api.themoviedb.org/3/search/${type}`;

  const { data } = useTmdb<SearchResponse>(endpoint, { page, query });

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(
      type === "person" ? result.profile_path ?? "" : result.poster_path ?? ""
    ),
    primaryText:
      type === "movie"
        ? result.original_title
        : type === "tv"
        ? result.original_name
        : result.name,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-300 space-y-5 p-5">
      <ImageGrid
        images={gridData}
        onClick={(image) => navigate(`/${type}/${image.id}`)}
      />
      <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
    </section>
  );
};
