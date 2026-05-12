import { createContext } from "react";
import type { ImageCell } from "@/core";

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export type UserContextType = {
  userName: string;
  favorites: Map<number, ImageCell>;
  setUserName: (userName: string) => void;
  toggleFavorite: (image: ImageCell) => void;
};
