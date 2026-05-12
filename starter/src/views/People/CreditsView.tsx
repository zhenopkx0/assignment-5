import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ImageGrid } from "@/components";
import { getImageUrl, type ImageCell } from "@/core";
import { MOVIE_ENDPOINT, TV_ENDPOINT } from "@/core/constants/constants";
import { useTmdb } from "@/hooks";

type CreditsResponse = {
  cast: Array<{
    id: number;
    name: string;
    profile_path: string | null;
    character: string;
  }>;
};

export const CreditsView = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const ENDPOINT = pathname.includes("movie") ? MOVIE_ENDPOINT : TV_ENDPOINT;
  const { id } = useParams();
  const { data } = useTmdb<CreditsResponse>(`${ENDPOINT}/${id}/credits`, {});

  const gridData: ImageCell[] = (data?.cast ?? []).map((cast) => ({
    id: cast.id,
    imageUrl: getImageUrl(cast.profile_path ?? ""),
    primaryText: cast.name,
    secondaryText: cast.character,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="min-h-screen bg-gray-900 text-white">
      <h2 className="mb-6 font-bold text-2xl">Credits</h2>
      {!data.cast.length && (
        <p className="text-center text-gray-400">No credits available.</p>
      )}
      <ImageGrid
        images={gridData}
        onClick={(image) => navigate(`/person/${image.id}`)}
      />
    </section>
  );
};
