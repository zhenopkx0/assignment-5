import { useNavigate } from "react-router-dom";
import { ImageGrid } from "@/components";
import { useUserContext } from "@/hooks";

export const CartView = () => {
  const navigate = useNavigate();
  const { favorites } = useUserContext();

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="font-bold text-3xl">Cart</h1>
      {favorites.size === 0 ? (
        <p className="mt-10 text-gray-400">You have no items in your cart.</p>
      ) : (
        <ImageGrid
          images={Array.from(favorites.values())}
          onClick={(image) => navigate(`/movie/${image.id}/credits`)}
        ></ImageGrid>
      )}
    </section>
  );
};
