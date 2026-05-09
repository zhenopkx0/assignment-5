import { Link } from "@/components";

export const GenreSubheader = () => {
  return (
    <header>
      <nav className="flex gap-4 bg-gray-600 p-4">
        <Link to="/genre/tv">TV</Link>
        <Link to="/genre/movies">Movies</Link>
      </nav>
    </header>
  );
};
