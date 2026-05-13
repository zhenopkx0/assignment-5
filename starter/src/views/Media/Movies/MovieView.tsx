import { FaCalendarAlt, FaHeart, FaRegHeart } from "react-icons/fa";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Button, LinkGroup, Modal } from "@/components";
import { getImageUrl, ICON_SIZE, IMAGE_BASE_URL } from "@/core";
import { MOVIE_ENDPOINT } from "@/core/constants/constants";
import { useTmdb, useUserContext } from "@/hooks";

type DetailResponse = {
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
  const { favorites, toggleFavorite } = useUserContext();
  const navigate = useNavigate();
  const { data } = useTmdb<DetailResponse>(`${MOVIE_ENDPOINT}/${id}`, {
    append_to_response: "videos",
  });

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <Modal onClick={() => navigate(-1)}>
      <div className="max-h-screen overflow-y-auto">
        <section className="mx-auto max-w-300 p-10">
          <div
            className="mt-4 h-75 bg-center bg-cover"
            style={{
              backgroundImage: `url(${ORIGINAL_IMAGE_BASE_URL}${data.backdrop_path})`,
            }}
          />
          <button
            className="rounded-full p-2 transition hover:bg-black/40"
            onClick={() =>
              toggleFavorite({
                id: data.id,
                imageUrl: getImageUrl(data.poster_path),
                primaryText: data.title,
              })
            }
          >
            {favorites.has(data.id) ? (
              <FaHeart className="text-blue-500" size={ICON_SIZE} />
            ) : (
              <FaRegHeart className="text-white" size={ICON_SIZE} />
            )}
          </button>
          <div className="mx-auto flex max-w-5xl flex-row gap-8 px-6 py-10">
            <img
              alt={data.title}
              className="h-93.75 w-62.5 rounded-xl object-cover shadow-lg"
              src={`${IMAGE_BASE_URL}${data.poster_path}`}
            />
            <div className="space-y-4">
              <Button onClick={() => navigate(-1)}>← Back</Button>
              <h1 className="font-bold text-4xl">{data.title}</h1>
              <p className="flex items-center gap-2 text-gray-400">
                <FaCalendarAlt />
                {data.release_date}
              </p>
              <p className="text-gray-300 leading-relaxed">{data.overview}</p>
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
      </div>
    </Modal>
  );
};
