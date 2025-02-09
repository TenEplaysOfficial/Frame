import { SearchIcon, X } from 'lucide-react';
import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import APIDATA from '../api';
import Loader from './Loader';
import { SearchItemsProps } from '../types';
import { Link } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';
import ErrorMsg from './ErrorMsg';

export default function Search() {
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search || '', 500);
  const { data, isLoading, errorMessage }: SearchItemsProps = useFetch({
    urlType: 'search',
    query: debouncedValue.trim() !== '' ? debouncedValue : null,
  });
  // console.log('Search rendered',search);
  // console.log('Search data', data);
  return (
    <>
      <div
        className={`font-fontKanit relative z-20 mx-auto mb-4 flex w-full max-w-xl items-center rounded-xl bg-white/10 px-3 py-1 text-xl font-medium tracking-wider ring-2 ring-zinc-600 placeholder:opacity-85 focus-within:ring-indigo-600`}
      >
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="font-secondary flex-1 border-none bg-transparent py-1 text-lg tracking-widest outline-none placeholder:text-white/65"
        />
        <span>
          {search ? (
            <X
              className={`cursor-pointer ${search ? 'opacity-100' : 'opacity-0'} transition-all duration-300`}
              onClick={() => setSearch('')}
            />
          ) : (
            <SearchIcon
              className={`cursor-pointer ${search ? 'opacity-0' : 'opacity-100'} transition-all duration-300`}
            />
          )}
        </span>
      </div>
      {search.trim() !== '' && (
        <SearchItems
          data={data}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      )}
    </>
  );
}

const SearchItems = ({ data, isLoading, errorMessage }: SearchItemsProps) => {
  return (
    <div className="scrollbar space-y- relative -top-2 max-h-[40vh] w-full max-w-xl cursor-pointer overflow-y-scroll">
      {isLoading ? (
        <Loader />
      ) : errorMessage ? (
        <ErrorMsg msg={errorMessage} />
      ) : (
        data.map(
          (item) =>
            (item.poster_path || item.profile_path || item.backdrop_path) && (
              <Link key={item.id} to={`/explore/${item.media_type}/${item.id}`}>
                <div
                  className={`mt-1 mb-3 flex items-center gap-2 rounded-2xl border bg-neutral-900/60 p-2 backdrop-blur-lg`}
                >
                  <img
                    src={`${APIDATA.IMAGE_w500_BASE_URL}${item.poster_path || item.profile_path || item.backdrop_path}`}
                    alt={item.name}
                    loading="lazy"
                    className="min-h-28 w-28 rounded-lg"
                  />
                  <div>
                    <h3 className="font-secondary text-lg font-medium">
                      {(item.name || item.title) === item.original_name
                        ? item.original_name
                        : item.name
                          ? `${item.name} (${item.original_name})`
                          : item.title}
                    </h3>
                    <p className="line-clamp-2">{item.overview}</p>
                    <div className="font-para mt-2 flex space-x-2 text-sm">
                      {item.vote_average && (
                        <p>
                          <span className="pr-2">★</span>
                          {item.vote_average}
                        </p>
                      )}
                      {item.vote_average && item.release_date && <span>•</span>}
                      {item.release_date && <p>{item.release_date}</p>}
                      {(item.release_date || item.vote_average) &&
                        item.media_type && <span>•</span>}
                      {item.media_type && (
                        <p>
                          {item.media_type.charAt(0).toUpperCase() +
                            item.media_type.slice(1)}
                        </p>
                      )}
                      {item.known_for_department && (
                        <p>{item.known_for_department}</p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ),
        )
      )}
    </div>
  );
};
