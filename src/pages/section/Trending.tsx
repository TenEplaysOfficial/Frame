import { useEffect, useState } from 'react';
import MovieCard from '../../components/MovieCard';
import Title from '../../components/Title';
import { movieCard } from '../../types';
import useFetch from '../../hooks/useFetch';
import Loader from '../../components/Loader';

export default function Trending({ title = 'Trending' }: { title?: string }) {
  const [trendingList, setTrendingList] = useState([]);
  const { data, isLoading, errorMessage } = useFetch({ urlType: 'trending' });

  useEffect(() => {
    if (data.length > 0) {
      setTrendingList(data);
    }
  }, [data]);

  return (
    <section>
      <Title title={title} />
      {isLoading ? (
        <Loader />
      ) : errorMessage ? (
        <div className="mx-auto text-red-500">{errorMessage}</div>
      ) : (
        <div className="hide-scrollbar flex max-h-fit min-h-[60vh] w-full space-x-4 overflow-x-scroll px-2 py-4">
          {trendingList.map(
            ({
              id,
              poster_path,
              title,
              vote_average,
              release_date,
              original_language,
            }: movieCard) => (
              <div key={id} className="flex-none">
                <MovieCard
                  key={id}
                  id={id}
                  poster_path={poster_path}
                  title={title}
                  vote_average={vote_average}
                  release_date={release_date}
                  original_language={original_language}
                />
              </div>
            ),
          )}
        </div>
      )}
    </section>
  );
}
