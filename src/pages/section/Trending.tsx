import MovieCard from '../../components/MovieCard';
import Title from '../../components/Title';
import { CardProps } from '../../types';
import useFetch from '../../hooks/useFetch';
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router-dom';

export default function Trending({ title = 'Trending' }: { title?: string }) {
  const { data, isLoading, errorMessage } = useFetch({ urlType: 'trending' });
  // console.log('Trending data', data);
  const navigate = useNavigate();
  return (
    <section>
      <Title title={title} />
      {isLoading ? (
        <Loader />
      ) : errorMessage ? (
        <div className="mx-auto text-red-500">{errorMessage}</div>
      ) : (
        <div className="hide-scrollbar flex max-h-fit min-h-[60vh] w-full space-x-4 overflow-x-scroll px-2 py-4">
          {data.map(
            ({
              id,
              poster_path,
              title,
              name,
              vote_average,
              release_date,
              original_language,
              media_type,
            }: CardProps) => (
              <div key={id} className="flex-none">
                <MovieCard
                  key={id}
                  id={id}
                  onClick={() => navigate(`explore/${media_type}/${id}`)}
                  poster_path={poster_path}
                  title={title}
                  name={name}
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
