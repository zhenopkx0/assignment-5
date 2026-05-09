import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { API_KEY, MOVIE_ENDPOINT, TV_ENDPOINT } from "@/core/constants/constants";

type TrailerResponse = {
  videos?: {
    results: Array<{
      key: string;
      name: string;
      site: string;
      type: string;
    }>;
  };
};

export const TrailerView = () => {
  const { pathname } = useLocation();
  const ENDPOINT = pathname.includes("movie") ? MOVIE_ENDPOINT : TV_ENDPOINT;
  const { id } = useParams();
  const [movie, setMovie] = useState<TrailerResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [trailer, setTrailer] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const getMovie = async () => {
      try {
        setLoading(true);

        const response = await axios.get<TrailerResponse>(`${ENDPOINT}/${id}`, {
          params: { api_key: API_KEY, append_to_response: "videos" },
          signal: controller.signal,
        });

        const trailerVideo =
          response.data.videos?.results.find(
            (video) => video.site === "YouTube" && video.type === "Trailer" && video.name?.toLowerCase().includes("official"),
          ) || response.data.videos?.results.find((video) => video.site === "YouTube" && video.type === "Trailer");

        if (trailerVideo) {
          setTrailer(trailerVideo.key);
        }
        setMovie(response.data);
      } catch (error) {
        console.error("Failed to fetch movie detail:", error);
      } finally {
        setLoading(false);
      }
    };

    getMovie();

    return () => controller.abort();
  }, [id, ENDPOINT]);

  if (loading || !movie) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-300 p-10">
      <div className="mx-auto flex max-w-5xl flex-row gap-8 px-6 py-10">
        <div className="space-y-4">
          {trailer && (
            <div className="aspect-video">
              <iframe
                allowFullScreen
                className="h-full w-full rounded-xl"
                src={`https://www.youtube.com/embed/${trailer}`}
                title="Movie Trailer"
              />
            </div>
          )}
        </div>
      </div>
      <section className="mx-auto max-w-300">
        <Outlet />
      </section>
    </section>
  );
};
