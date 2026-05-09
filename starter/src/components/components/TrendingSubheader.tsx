import { Link } from "@/components";

export const TrendingSubheader = () => {
  return (
    <header>
      <nav className="flex gap-4 bg-gray-600 p-4">
        <Link to="/trending/movie">Movies</Link>
        <Link to="/trending/tv">TV</Link>
      </nav>
    </header>
  );
};
