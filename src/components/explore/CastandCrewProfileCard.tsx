import { Link } from 'react-router-dom';
import APIDATA from '../../api';
import { CastandCrewProfileCardProps } from '../../types';

export default function CastandCrewProfileCard({
  id,
  name,
  profile_path,
  job,
  character,
}: CastandCrewProfileCardProps) {
  return (
    <Link to={`/explore/person/${id}`}>
      <div className="font-para w-40 text-center sm:w-32">
        <img
          src={`${APIDATA.IMAGE_w500_BASE_URL}${profile_path}`}
          alt={name}
          loading="lazy"
          className="w-full rounded-lg"
        />
        <p className="mt-1 font-medium">{name}</p>
        <p className="text-sm font-medium text-gray-400">{character || job}</p>
      </div>
    </Link>
  );
}
