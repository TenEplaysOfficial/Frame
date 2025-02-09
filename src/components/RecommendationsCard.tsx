import { Link } from 'react-router-dom';
import { RecommendationsDataProps } from '../types';
import APIDATA from '../api';

export default function RecommendationsCard({
  backdrop_path,
  first_air_date,
  name,
  original_name,
  origin_country,
  overview,
  id,
  original_title,
  release_date,
  title,
  poster_path,
  media_type,
}: RecommendationsDataProps) {
  return (
    <>
      {(backdrop_path || poster_path) && (
        <div className="group block overflow-hidden rounded-lg bg-zinc-900 text-white shadow-lg transition-all duration-300 hover:-translate-y-5 sm:mt-8">
          {media_type ? (
            <Link to={`/explore/${media_type}/${id}`}>
              <Set
                backdrop_path={backdrop_path}
                poster_path={poster_path}
                title={title}
                release_date={release_date}
                original_title={original_title}
                overview={overview}
                first_air_date={first_air_date}
                name={name}
                origin_country={origin_country}
                original_name={original_name}
              />
            </Link>
          ) : (
            <>
              <Set
                backdrop_path={backdrop_path}
                poster_path={poster_path}
                title={title}
                release_date={release_date}
                original_title={original_title}
                overview={overview}
                first_air_date={first_air_date}
                name={name}
                origin_country={origin_country}
                original_name={original_name}
              />
            </>
          )}
        </div>
      )}
    </>
  );
}

const Set = ({
  backdrop_path,
  first_air_date,
  name,
  original_name,
  origin_country,
  overview,
  original_title,
  release_date,
  title,
  poster_path,
}: RecommendationsDataProps) => {
  return (
    <>
      <img
        src={`${APIDATA.IMAGE_Backdrop_BASE_URL}${backdrop_path || poster_path}`}
        alt={name || original_name || title || original_title}
        loading="lazy"
        className="h-40 w-full object-cover transition-all duration-300 group-hover:scale-105"
      />
      <div className="p-2">
        <h3 className="truncate text-lg font-bold">
          <span>{name || original_name || title || original_title}</span>
          <span> {name !== original_name && original_name}</span>
        </h3>
        {(first_air_date || release_date) && (
          <p className="flex items-center justify-between text-sm text-gray-400">
            <span>
              {first_air_date || release_date?.split('-').reverse().join('-')}
            </span>
            {origin_country && (
              <span className="border px-1 font-semibold opacity-45">
                {origin_country}
              </span>
            )}
          </p>
        )}
        {overview && (
          <p className="line-clamp-2 text-sm text-gray-300">{overview}</p>
        )}
      </div>
    </>
  );
};
