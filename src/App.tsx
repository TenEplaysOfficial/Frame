import API from './api';
import { useEffect, useState } from 'react';
import Search from './components/Search';
import MovieCard from './components/MovieCard';
import { movieCard } from './types';
import Grid from './components/Layout/Grid';
import Btn from './components/Btn';

function App() {
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [tAll, setTAll] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);

  const fetchMovies = async ({
    pageNo = 1,
    category = 'movie',
  }: {
    pageNo?: number;
    category?: string;
  }) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = `${API.API_BASE_URL}/discover/${category}?include_adult=false&include_video=true&language=en-US&page=${pageNo}&sort_by=popularity.desc`;
      const response = await fetch(endpoint, API.API_OPTIONS);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.results.length === 0 || data.results === 'False') {
        setErrorMessage('No movies found');
        setMovieList([]);
      }
      setMovieList(data.results || []);
    } catch {
      setErrorMessage('Error while fetching data, please try again later');
    } finally {
      setIsLoading(false);
    }
  };

  // Fixed fetchTAll function
  const fetchTAll = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = `${API.API_BASE_URL}/trending/all/day?language=en-US`;
      const response = await fetch(endpoint, API.API_OPTIONS);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.results.length === 0 || data.results === 'False') {
        setErrorMessage('No trending items found');
        setTAll([]);
      }
      setTAll(data.results || []);
    } catch {
      setErrorMessage('Error while fetching data, please try again later');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies({ pageNo });
  }, [pageNo]);

  useEffect(() => {
    fetchTAll();
  }, []);

  const handleNextPage = () => setPageNo((prev) => prev + 1);
  const handlePreviousPage = () => setPageNo((prev) => Math.max(prev - 1, 1));

  return (
    <main className="h-full min-h-screen overflow-hidden bg-gradient-to-t from-neutral-950 to-[#0B0019] text-white">
      <div className="mx-auto max-w-7xl px-2 pb-12 sm:px-5 md:px-0">
        <header>
          <Search />
        </header>
        <h1>Trending</h1>
        <div className="flex h-[60vh] w-full space-x-4 overflow-x-scroll py-4">
          {tAll.map(
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

        <Btn
          onClick={handlePreviousPage}
          title="Previous Page"
          disabled={pageNo === 1}
        />
        <span>Page: {pageNo}</span>
        <Btn onClick={handleNextPage} title="Next Page" />

        <section>
          {isLoading ? (
            <div>Loading...</div>
          ) : errorMessage ? (
            <div className="mx-auto text-red-500">{errorMessage}</div>
          ) : (
            <>
              <Grid>
                {movieList.map(
                  ({
                    id,
                    poster_path,
                    title,
                    vote_average,
                    release_date,
                    original_language,
                  }: movieCard) => (
                    <MovieCard
                      key={id}
                      id={id}
                      poster_path={poster_path}
                      title={title}
                      vote_average={vote_average}
                      release_date={release_date}
                      original_language={original_language}
                    />
                  ),
                )}
              </Grid>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
