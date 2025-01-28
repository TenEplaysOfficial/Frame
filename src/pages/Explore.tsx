import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loader from '../components/Loader';
import APIDATA from '../api';

export default function Explore() {
  const { id, type } = useParams();

  const { data, isLoading, errorMessage } = useFetch({
    urlType: 'findByID',
    findByID: id,
    category: type,
  });

  // console.log('Profile Data:', data);

  if (isLoading) {
    return <Loader />;
  }

  if (errorMessage) {
    return <div className="mx-auto text-red-500">{errorMessage}</div>;
  }

  return <Details data={Array.isArray(data) ? data[0] : data} />;
}

interface DetailsProps {
  data: {
    poster_path: string;
    backdrop_path: string;
    original_name: string;
    name: string;
    title: string;
    release_date: string;
    vote_average: number;
    profile_path: string;
    known_for_department: string;
  };
}

const Details = ({ data }: DetailsProps) => {
  const {
    poster_path,
    backdrop_path,
    original_name,
    name,
    title,
    release_date,
    vote_average,
    known_for_department,
  } = data;

  return (
    <div className="pt-3">
      {backdrop_path && (
        <img
          src={`${APIDATA.IMAGE_Backdrop_BASE_URL}${backdrop_path}`}
          alt={name || title || original_name}
          className="max-h-fit w-full rounded-lg object-fill"
        />
      )}

      <img
        src={`${APIDATA.IMAGE_w500_BASE_URL}${poster_path}`}
        alt={name || title || original_name}
        className="rounded-lg"
      />
      <h2>{name || title || original_name}</h2>
      <p>Release Date: {release_date}</p>
      <p>Vote Average: {vote_average}</p>
      <p>{known_for_department}</p>
    </div>
  );
};
