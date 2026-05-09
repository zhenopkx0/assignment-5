import { useParams } from "react-router-dom";
import { ImageGrid } from "@/components";
import type { ImageCell } from "@/core";
import { useTmdb } from "@/hooks";

type EpisdoesResponse = {
  episodes: Array<{
    id: number;
    name: string;
    still_path: string | null;
    episode_number: number;
  }>;
};

const EPISODE_ENDPOINT = "https://api.themoviedb.org/3/tv";

export const EpisodesView = () => {
  const { id, season_number } = useParams();

  const { data } = useTmdb<EpisdoesResponse>(`${EPISODE_ENDPOINT}/${id}/season/${season_number}`, {});

  const gridData: ImageCell[] = (data?.episodes ?? []).map((episodes) => ({
    id: episodes.episode_number,
    imageUrl: episodes.still_path ?? "",
    primaryText: episodes.name,
    secondaryText: episodes.episode_number ? `Episode ${episodes.episode_number}` : undefined,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="min-h-screen bg-gray-900 text-white">
      <h2 className="mb-6 font-bold text-2xl">Episodes</h2>
      {!data.episodes.length && <p className="text-center text-gray-400">No episodes available.</p>}
      <ImageGrid images={gridData} />
    </section>
  );
};
