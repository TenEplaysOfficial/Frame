import { ReactNode } from 'react';

export type CardProps = {
  id: number;
  poster_path: string;
  title: string;
  name: string;
  vote_average: number;
  release_date?: string;
  original_language: string;
  media_type?: string;
  onClick?: () => void;
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
  isLoading: boolean;
};
