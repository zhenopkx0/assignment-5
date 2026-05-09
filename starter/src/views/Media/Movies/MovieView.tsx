import axios from "axios";
import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Button, LinkGroup, Modal } from "@/components";
import { IMAGE_BASE_URL } from "@/core";
import { API_KEY, MOVIE_ENDPOINT } from "@/core/constants/constants";

type DetailRepsonse = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  videos?: {
    results: Array<{
      key: string;
      name: string;
      site: string;
      type: string;
    }>;
  };
};

const ORIGINAL_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export const MovieView = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<DetailRepsonse | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    const getMovie = async () => {
      try {
        setLoading(true);

        const response = await axios.get<DetailRepsonse>(`${MOVIE_ENDPOINT}/${id}`, {
          params: { api_key: API_KEY, append_to_response: "videos" },
          signal: controller.signal,
        });

        setMovie(response.data);
      } catch (error) {
        console.error("Failed to fetch movie detail:", error);
      } finally {
        setLoading(false);
      }
    };

    getMovie();

    return () => controller.abort();
  }, [id]);

  if (loading || !movie) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <Modal onClick={() => navigate(-1)}>
      <section className="mx-auto max-w-300 p-10">
        <div
          className="mt-4 h-75 bg-center bg-cover"
          style={{
            backgroundImage: `url(${ORIGINAL_IMAGE_BASE_URL}${movie.backdrop_path})`,
          }}
        />
        <div className="mx-auto flex max-w-5xl flex-row gap-8 px-6 py-10">
          <img
            alt={movie.title}
            className="h-93.75 w-62.5 rounded-xl object-cover shadow-lg"
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          />
          <div className="space-y-4">
            <Button onClick={() => navigate(-1)}>← Back</Button>
            <h1 className="font-bold text-4xl">{movie.title}</h1>
            <p className="flex items-center gap-2 text-gray-400">
              <FaCalendarAlt />
              {movie.release_date}
            </p>
            <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
            <LinkGroup
              options={[
                { label: "Credits", to: "credits" },
                { label: "Reviews", to: "reviews" },
                { label: "Trailer", to: "trailer" },
              ]}
            />
          </div>
        </div>
        <section className="mx-auto max-w-300">
          <Outlet />
        </section>
      </section>
    </Modal>
  );
};
