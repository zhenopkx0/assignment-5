import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "grey" | "blue";
  disabled?: boolean;
  onClick: () => void;
};

const baseStyles =
  "inline-block px-6 py-3 rounded-2xl transition-all duration-200 font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400/40";

const variants = {
  blue: "bg-pink-400 text-white hover:bg-green-300 active:bg-green-400",
  grey: "bg-pink-100 text-pink-800 hover:bg-green-200 active:bg-green-300",
  primary: "bg-pink-500 text-white hover:bg-green-400 active:bg-green-500",
};

export const Button = ({ children, variant = "primary", disabled = false, onClick }: ButtonProps) => {
  return (
    <button
      className={`${baseStyles} ${disabled ? "cursor-not-allowed bg-gray-200 text-gray-400 shadow-none" : variants[variant]}`}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};
