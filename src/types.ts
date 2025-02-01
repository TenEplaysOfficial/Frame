import { ReactNode } from 'react';

export type CardProps = {
  id: number;
  poster_path: string;
  title: string;
  name: string;
  vote_average: number;
  release_date?: string;
  original_language: string;
  media_type?: 'movie' | 'tv' | 'person';
};

export type GridProps = {
  children: ReactNode;
};

export type SearchItemsProps = {
  data: {
    id: number;
    media_type: string;
    poster_path: string;
    backdrop_path: string;
    original_name: string;
    name: string;
    title: string;
    release_date: string;
    vote_average: number;
    profile_path: string;
    known_for_department: string;
  }[];
  isLoading?: boolean;
  errorMessage?: string;
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
    biography?: string;
    birthday?: string;
    deathday?: string | null;
    imdb_id?: string;
    popularity?: number;
    place_of_birth?: string;
    gender?: number;
    also_known_as?: [];
  };
  isLoading: boolean;
  errorMessage: string;
};
