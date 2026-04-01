import api from "./api";
import type { Movie } from "../types/movie";

export const getPopularMovies = async (): Promise<Movie[]> => {
  const response = await api.get("/movies/popular");
  return response.data;
};
