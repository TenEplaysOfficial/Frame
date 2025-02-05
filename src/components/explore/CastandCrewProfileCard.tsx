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
      <div className="w-32 text-center">
        <img
          src={`${APIDATA.IMAGE_w500_BASE_URL}${profile_path}`}
          alt={name}
          className="w-full rounded-lg"
        />
        <p className="mt-1 font-bold">{name}</p>
        <p className="text-sm text-gray-400">{character || job}</p>
      </div>
    </Link>
  );
}
