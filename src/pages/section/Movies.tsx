import { useState } from 'react';
import Grid from '../../components/Layout/Grid';
import useFetch from '../../hooks/useFetch';
import Btn from '../../components/Btn';
import Loader from '../../components/Loader';
import { CardProps } from '../../types';
import MovieCard from '../../components/MovieCard';
import Title from '../../components/Title';
import { useNavigate } from 'react-router-dom';

export default function Movies({ title = 'Movies' }: { title?: string }) {
  const [pageNo, setPageNo] = useState(1);
  const { data, isLoading, errorMessage } = useFetch({
    urlType: 'movie',
    pageNo,
  });
  // console.log('Movies data', data);
  const handleNextPage = () => setPageNo((prev) => prev + 1);
  const handlePreviousPage = () => setPageNo((prev) => Math.max(prev - 1, 1));
  const navigate = useNavigate();
  return (
    <section>
      <Title title={title} />
      {isLoading ? (
        <Loader />
      ) : errorMessage ? (
        <div className="mx-auto text-red-500">{errorMessage}</div>
      ) : (
        <>
          <Grid>
            {data.map(
              ({
                id,
                poster_path,
                title,
                name,
                vote_average,
                release_date,
                original_language,
              }: CardProps) => (
                <MovieCard
                  key={id}
                  id={id}
                  poster_path={poster_path}
                  title={title}
                  name={name}
                  onClick={() => navigate(`explore/movie/${id}`)}
                  vote_average={vote_average}
                  release_date={release_date}
                  original_language={original_language}
                />
              ),
            )}
          </Grid>
          <div className="flex flex-col justify-between space-y-3 px-2 pt-10 lg:flex-row">
            {pageNo > 1 && (
              <Btn onClick={handlePreviousPage} title="Previous Page" />
            )}
            <Btn onClick={handleNextPage} title="Next Page" />
          </div>
        </>
      )}
    </section>
  );
}
