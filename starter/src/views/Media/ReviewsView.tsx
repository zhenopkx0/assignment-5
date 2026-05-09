import { useParams } from "react-router-dom";
import { MOVIE_ENDPOINT } from "@/core/constants/constants";
import { useTmdb } from "@/hooks";

type ReviewsResponse = {
  results: Array<{ id: string; author: string; content: string }>;
};

export const ReviewsView = () => {
  const { id } = useParams();
  const { data } = useTmdb<ReviewsResponse>(`${MOVIE_ENDPOINT}/${id}/reviews`, {});

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="min-h-screen space-y-6 bg-gray-900 text-white">
      <h2 className="font-bold text-2xl">Reviews</h2>
      {!data.results.length && <p className="text-center text-gray-400">No reviews available.</p>}
      {data.results.slice(0, 5).map((review) => (
        <div className="rounded-xl bg-gray-800 p-5 shadow" key={review.id}>
          <p className="mb-2 text-gray-400 text-sm">By {review.author}</p>
          <p className="line-clamp-6 text-gray-300 text-sm leading-relaxed">{review.content}</p>
        </div>
      ))}
    </section>
  );
};
