import axios from "axios";

const API_KEY = "5bffb8ca99dbfae576ba658a895078ee";
const BASE_URL = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface IPerson {
  gender: number;
  id: number;
  know_for_department: string;
  name: string;
}

interface ITv {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface IGenreResult {
  [genres: string]: { id: number; name: string }[];
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  total_pages: number;
  total_results: number;
  results: IMovie[];
}

export interface IGetTvsResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  total_pages: number;
  total_results: number;
  results: ITv[];
}

export interface IGetMoviesSearchResult {
  results: IMovie[];
}

export interface IGetTvsSearchResult {
  results: ITv[];
}

export interface ICreditResult {
  cast: IPerson[];
  crew: IPerson[];
}

export const getMovies = async () => {
  return (await fetch(`${BASE_URL}/movie/now_playing?language=ko-KR&api_key=${API_KEY}`)).json();
};

export const getPopularMovies = async () => {
  return (await fetch(`${BASE_URL}/movie/popular?language=ko-KR&api_key=${API_KEY}`)).json();
};

export const getTopRatedMovies = async () => {
  return (await fetch(`${BASE_URL}/movie/top_rated?language=ko-KR&api_key=${API_KEY}`)).json();
};

export const getUpcomingMovies = async () => {
  return (await fetch(`${BASE_URL}/movie/upcoming?language=ko-KR&api_key=${API_KEY}`)).json();
};

export const getSearchMovieResult = async (keyword: string | undefined) => {
  return await axios
    .get(`${BASE_URL}/search/movie?query=${keyword}&language=ko-KR&api_key=${API_KEY}`)
    .then((res) => res.data);
};

export const getSearchTvResult = async (keyword: string | undefined) => {
  return await axios
    .get(`${BASE_URL}/search/tv?query=${keyword}&language=ko-KR&api_key=${API_KEY}`)
    .then((res) => res.data);
};

export const getCredit = async (id: number | undefined) => {
  return await axios
    .get(`${BASE_URL}/movie/${id}/credits?language=ko-KR&api_key=${API_KEY}`)
    .then((res) => res.data);
};

export const getMovieGenre = async () => {
  return await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`).then((res) => res.data);
};

export const getTrendingTvs = async () => {
  return await axios
    .get(`${BASE_URL}/trending/tv/day?language=ko-KR&api_key=${API_KEY}`)
    .then((res) => res.data);
};

export const getTopRatedTvs = async () => {
  return await axios
    .get(`${BASE_URL}/tv/top_rated?language=ko-KR&api_key=${API_KEY}`)
    .then((res) => res.data);
};

export const getPopularTvs = async () => {
  return await axios
    .get(`${BASE_URL}/tv/popular?language=ko-KR&api_key=${API_KEY}`)
    .then((res) => res.data);
};

export const getTvGenre = async () => {
  return await axios.get(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`).then((res) => res.data);
};
