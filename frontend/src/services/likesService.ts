import api from "./api";
import type { LikeRequest } from "../types/movie";

export const likeMovie = async (movie: LikeRequest): Promise<void> => {
  await api.post("/likes", movie);
};

export const unlikeMovie = async (tmdb_id: number): Promise<void> => {
  await api.delete(`/likes/${tmdb_id}`);
};