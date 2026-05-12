import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid } from "@/components";
import { getImageUrl, type ImageCell } from "@/core";
import { useTmdb } from "@/hooks";

type SeasonsResponse = {
  seasons: Array<{
    id: number;
    name: string;
    poster_path: string | null;
    season_number: number;
  }>;
};

const TV_ENDPOINT = "https://api.themoviedb.org/3/tv";

export const SeasonsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useTmdb<SeasonsResponse>(`${TV_ENDPOINT}/${id}`, {});

  const gridData: ImageCell[] = (data?.seasons ?? []).map((seasons) => ({
    id: seasons.season_number,
    imageUrl: getImageUrl(seasons.poster_path ?? ""),
    primaryText: seasons.name,
    secondaryText: seasons.season_number
      ? `Season ${seasons.season_number}`
      : undefined,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="min-h-screen bg-gray-900 text-white">
      <h2 className="mb-6 font-bold text-2xl">Seasons</h2>
      {!data.seasons.length && (
        <p className="text-center text-gray-400">No seasons available.</p>
      )}
      <ImageGrid
        images={gridData}
        onClick={(seasons) => navigate(`/tv/${id}/season/${seasons.id}`)}
      />
    </section>
  );
};
