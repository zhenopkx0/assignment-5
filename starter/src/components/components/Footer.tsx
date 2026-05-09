import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="mt-10 border-gray-800 border-t bg-gray-900">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 text-gray-400 text-sm md:flex-row">
        <p className="text-center md:text-left">
          &copy; {new Date().getFullYear()} TMDB Explorer. Built with React, Vite and React Router.
        </p>
        <div className="flex items-center gap-4">
          <span className="hidden text-gray-500 sm:inline">Made by YOURS TRULY ❤️</span>

          <Link className="text-gray-400 text-xl transition-colors hover:text-white" to="https://github.com/zhenopkx0/asst4.git">
            <FaGithub />
          </Link>
        </div>
      </div>
    </footer>
  );
};
