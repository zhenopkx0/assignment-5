import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, Link } from "@/components";
import type { SearchType } from "@/core";
import { SearchBar } from "./SearchBar1";
import { GiCat } from "react-icons/gi";

export const Header = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>("");
  const [type, setType] = useState<SearchType>("movie");

  return (
    <header className="bg-gray-800 text-white pt-3">
      <nav className="flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-5 font-semibold text-lg">
          <GiCat className="text-orange-300 text-4xl" />
          <span className="text-blue-300 text-3xl">TMDB Explorer</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Link match={"movies/:options"} to="/movies/now-playing">
            <span className="hover:text-blue-400 transition">Movies</span>
          </Link>
          <Link match={"tv/:options"} to="/tv/airing-today">
            <span className="hover:text-blue-400 transition">TV</span>
          </Link>

          <Link match={"trending/:media"} to="/trending/movie?interval=day">
            <span className="hover:text-blue-400 transition">Trending</span>
          </Link>

          <Link match={"genre/:media/:genre"} to="/genre/movies/action">
            <span className="hover:text-blue-400 transition">Genres</span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <SearchBar
            onChange={(query) => {
              setQuery(query);
              navigate(`/search?q=${query}&type=${type}`);
            }}
            value={query}
          />
          <ButtonGroup
            onClick={(type) => {
              setType(type as SearchType);
              navigate(`/search?q=${query}&type=${type}`);
            }}
            options={[
              { label: "Movies", value: "movie" },
              { label: "TV", value: "tv" },
              { label: "People", value: "person" },
            ]}
            value={type}
          />
        </div>
      </nav>
    </header>
  );
};
