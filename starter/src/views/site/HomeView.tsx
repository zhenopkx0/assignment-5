import { useNavigate } from "react-router-dom";
import { Button, ImageGrid } from "@/components";
import { getImageUrl, type ImageCell, type MediaResponse } from "@/core";
import { useTmdb } from "@/hooks";
import { MOVIE_ENDPOINT } from "@/core/constants/constants";

export const HomeView = () => {
  const navigate = useNavigate();
  const { data } = useTmdb<MediaResponse>(`${MOVIE_ENDPOINT}/now_playing`, {});
  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.original_title,
  }));

  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-white">
      <main className="mx-auto flex max-w-7xl flex-1 flex-col items-center justify-center px-4">
        <section className="space-y-8 text-center">
          <h1 className="font-bold text-5xl tracking-tight">TMDB Explorer</h1>
          <p className="text-gray-400 text-lg">
            Explore movies and discover people using a fast, modern interface.
          </p>
          <Button onClick={() => navigate("/movies/now-playing")}>Enter</Button>
          <ImageGrid images={gridData.slice(15, 20)} />
        </section>
      </main>
    </div>
  );
};
