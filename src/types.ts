import { ReactNode } from 'react';

export type MovieProps = {
  data: {
    id: number;
    poster_path?: string;
    title?: string;
    name?: string;
    vote_average?: number;
    release_date?: string;
    original_language?: string;
    media_type?: 'movie' | 'tv' | 'person';
  }[];
  isLoading: boolean;
  errorMessage: string;
};

export type GridProps = {
  children: ReactNode;
  columns?: string;
  gap?: string;
};

export type SearchItemsProps = {
  data: {
    id: number;
    media_type: string;
    poster_path?: string;
    backdrop_path?: string;
    original_name?: string;
    name?: string;
    title?: string;
    release_date?: string;
    vote_average?: number;
    profile_path?: string;
    known_for_department?: string;
    overview?: string;
  }[];
  isLoading?: boolean;
  errorMessage?: string;
};

export type MovieCardProps = {
  id: number;
  poster_path?: string;
  title?: string;
  name?: string;
  media_type?: string;
  vote_average?: number;
  release_date?: string;
  original_language?: string;
};

export type PersonDataProps = {
  id: number;
  name: string;
  also_known_as?: string[];
  biography?: string;
  birthday?: string;
  deathday?: string | null;
  gender?: number;
  homepage?: string;
  imdb_id?: string;
  known_for_department?: string;
  place_of_birth?: string;
  profile_path?: string;
};

export type MovieTvDataProps = {
  data: {
    id: number;
    backdrop_path?: string;
    budget?: number;
    genres?: {
      id?: number;
      name?: string;
    }[];
    homepage?: string;
    imdb_id?: string;
    origin_country?: string[];
    original_language?: string;
    original_title?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    production_companies?: {
      id?: number;
      logo_path?: string;
      name?: string;
      origin_country?: string;
    }[];
    release_date?: string;
    revenue?: number;
    runtime?: number;
    spoken_languages?: {
      english_name?: string;
      name?: string;
    }[];
    status?: string;
    tagline?: string;
    title?: string;
    name?: string;
    vote_average?: number;
    belongs_to_collection?: {
      poster_path?: string;
      backdrop_path?: string;
    };
  }[];
  isLoading: boolean;
  errorMessage: string;
};

export type CastandCrewProfileCardProps = {
  id: number;
  profile_path?: string;
  name: string;
  character?: string;
  job?: string;
};

export type DetailsProps = {
  data: {
    poster_path: string;
    backdrop_path: string;
    original_name?: string;
    name?: string;
    title?: string;
    release_date?: string;
    vote_average?: number;
    vote_count?: number;
    profile_path?: string;
    known_for_department?: string;
    belongs_to_collection: {
      poster_path: string;
      backdrop_path: string;
    };
    genres: {
      id?: number;
      name?: string;
    }[];
    production_companies: {
      id?: number;
      logo_path?: string;
      name?: string;
      origin_country?: string;
    }[];
    spoken_languages: {
      id: number;
      english_name?: string;
      name?: string;
    }[];
    homepage?: string;
    overview?: string;
    budget?: number;
    revenue?: number;
    runtime?: number;
    tagline?: string;
  };
  isLoading: boolean;
  errorMessage: string;
};
