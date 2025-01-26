import { SearchIcon, X } from 'lucide-react';
import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import APIDATA from '../api';
import Loader from './Loader';
import { SearchItemsProps } from '../types';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';

export default function Search() {
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search || '', 500);
  const { data, isLoading } = useFetch({
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
          className="flex-1 border-none bg-transparent py-1 text-lg tracking-widest outline-none placeholder:text-white/65"
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
        <SearchItems data={data} isLoading={isLoading} />
      )}
    </>
  );
}

const SearchItems = ({ data, isLoading }: SearchItemsProps) => {
  const navigate = useNavigate();
  return (
    <div className="scrollbar relative -top-2 max-h-[40vh] min-h-[20vh] w-full max-w-xl cursor-pointer space-y-2 overflow-y-scroll">
      {isLoading ? (
        <Loader />
      ) : data.length > 0 ? (
        data.map(
          (item) =>
            (item.poster_path || item.profile_path || item.backdrop_path) && (
              <div
                key={item.id}
                onClick={() =>
                  navigate(`/explore/${item.media_type}/${item.id}`)
                }
                className={`flex items-center gap-2 rounded-2xl border bg-neutral-900/60 p-2 backdrop-blur-lg`}
              >
                <img
                  src={`${APIDATA.IMAGE_w500_BASE_URL}${item.poster_path || item.profile_path || item.backdrop_path}`}
                  alt={item.name}
                  className="max-w-28 rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-semibold">
                    {(item.name || item.title) === item.original_name
                      ? item.original_name
                      : item.name
                        ? `${item.name} (${item.original_name})`
                        : item.title}
                  </h3>

                  <div className="mt-2 flex space-x-2 text-sm">
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
            ),
        )
      ) : (
        <p className="text-center font-semibold">Not found</p>
      )}
    </div>
  );
};
