import { ReactNode } from 'react';

export type movieCard = {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
  release_date?: string;
  original_language: string;
};

export type GridProps = {
  children: ReactNode;
};
