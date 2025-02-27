import { Link } from 'react-router-dom';
import APIDATA from '../api';
import { MovieCardProps } from '../types';

export default function MovieCard({
  id,
  poster_path,
  title,
  name,
  media_type,
  vote_average,
  release_date,
  original_language,
}: MovieCardProps) {
  return (
    <Link to={`/explore/${media_type}/${id}`}>
      <div
        key={id}
        className="group relative mx-auto w-[325px] cursor-pointer overflow-hidden rounded-xl text-left sm:w-[285px]"
      >
        <img
          src={`${APIDATA.IMAGE_w500_BASE_URL}${poster_path}`}
          alt={title}
          loading="lazy"
          className="rounded-lg transition-all duration-300 ease-in-out group-hover:scale-105"
        />
        <div className="ease absolute -bottom-2 left-0 my-2 min-h-[15vh] w-full place-content-end bg-gradient-to-t from-black to-transparent p-2 transition-all duration-300 group-hover:min-h-[42vh]">
          <h2 className="ease font-primary text-lg font-semibold tracking-wide transition-all duration-500 group-hover:-translate-y-10 group-hover:text-2xl">
            {title || name}
          </h2>
          <div className="ease font-para flex items-center space-x-2 text-sm font-medium transition-all duration-500 group-hover:-translate-y-5 group-hover:text-lg">
            <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
            <span>•</span>
            <p>{original_language}</p>
            <span>•</span>
            <p>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
