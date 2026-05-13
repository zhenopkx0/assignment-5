import { BsFillSuitHeartFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { IoCart } from "react-icons/io5";
import { Link } from "react-router-dom";

export const User = () => {
  return (
    <nav className=" gap-4 bg-gray-800 p-4 text-2xl">
      <span className="text-white">Welcome, User!</span>
      <div className="flex justify-end bg-gray-800 text-white gap-4">
        <Link to="/favorites">
          <BsFillSuitHeartFill />
        </Link>
        <Link to="/settings">
          <IoMdSettings />
        </Link>
        <Link to="/cart">
          <IoCart />
        </Link>
      </div>
    </nav>
  );
};
