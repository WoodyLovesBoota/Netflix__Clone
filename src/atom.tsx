import { atom } from "recoil";
import { IGenreResult } from "./api";

interface IGenreState {
  [genres: string]: { id: number; name: string }[];
}

export const movieGenreState = atom<IGenreState>({
  key: "movieGenre",
  default: {},
});
