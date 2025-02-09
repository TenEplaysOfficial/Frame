import MovieCard from '../../components/MovieCard';
import Title from '../../components/Title';
import { MovieProps } from '../../types';
import useFetch from '../../hooks/useFetch';
import Loader from '../../components/Loader';
import HorizontalLayout from '../../components/Layout/HorizontalLayout';
import ErrorMsg from '../../components/ErrorMsg';

export default function Trending({ title = 'Trending' }: { title?: string }) {
  const { data, isLoading, errorMessage }: MovieProps = useFetch({
    urlType: 'trending',
  });
  // console.log('Trending data', data);
  return (
    <section>
      <Title title={title} />
      <HorizontalLayout>
        {isLoading ? (
          <Loader />
        ) : errorMessage ? (
          <ErrorMsg msg={errorMessage} />
        ) : (
          data.map(
            ({
              id,
              poster_path,
              title,
              name,
              vote_average,
              release_date,
              original_language,
              media_type,
            }) => (
              <div key={id} className="flex-none">
                <MovieCard
                  key={id}
                  id={id}
                  media_type={media_type}
                  poster_path={poster_path}
                  title={title}
                  name={name}
                  vote_average={vote_average}
                  release_date={release_date}
                  original_language={original_language}
                />
              </div>
            ),
          )
        )}
      </HorizontalLayout>
    </section>
  );
}
