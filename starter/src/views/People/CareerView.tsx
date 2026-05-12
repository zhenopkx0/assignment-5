import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid } from "@/components";
import { getImageUrl, type ImageCell } from "@/core";
import { useTmdb } from "@/hooks";

type CareerResponse = {
  cast: Array<{
    id: number;
    original_title: string;
    poster_path: string | null;
    character: string;
  }>;
};

const PERSON_ENDPOINT = "https://api.themoviedb.org/3/person";

export const CareerView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useTmdb<CareerResponse>(
    `${PERSON_ENDPOINT}/${id}/movie_credits`,
    {}
  );

  const gridData: ImageCell[] = (data?.cast ?? []).map((cast) => ({
    id: cast.id,
    imageUrl: getImageUrl(cast.poster_path ?? ""),
    primaryText: cast.original_title,
    secondaryText: cast.character,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div>
      <section className="min-h-screen bg-gray-900 text-white">
        <h2 className="mb-6 font-bold text-2xl">Career</h2>
        {!data.cast.length && (
          <p className="text-center text-gray-400">No career available.</p>
        )}
        <ImageGrid
          images={gridData}
          onClick={(id) => navigate(`/movie/${id}`)}
        />
      </section>
    </div>
  );
};
