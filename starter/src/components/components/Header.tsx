import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, Link } from "@/components";
import type { SearchType } from "@/core";
import { SearchBar } from "./SearchBar1";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { IoCart } from "react-icons/io5";
import { GiCat } from "react-icons/gi";

export const Header = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>("");
  const [type, setType] = useState<SearchType>("movie");

  return (
    <header>
      <nav className="flex gap-4 bg-gray-800 p-4">
        <h1 className="font-bold text-2xl text-blue-300">
          {" "}
          Hello, User <GiCat />{" "}
        </h1>
        <h1 className="font-bold text-2xl text-purple-300">TMDB Explorer </h1>
        <Link match={"movies/:options"} to="/movies/now-playing">
          Movies
        </Link>
        <Link match={"tv/:options"} to="/tv/airing-today">
          TV
        </Link>
        <Link match={"trending/:media"} to="/trending/movie?interval=day">
          Trending
        </Link>
        <Link match={"genre/:media/:genre"} to="/genre/movies/action">
          Genres
        </Link>
        <div className="flex items-center justify-between gap-3">
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
        <Link to="/favorites">
          <BsFillSuitHeartFill />
        </Link>
        <Link to="/settings">
          <IoMdSettings />
        </Link>
        <Link to="/cart">
          <IoCart />
        </Link>
      </nav>
    </header>
  );
};
