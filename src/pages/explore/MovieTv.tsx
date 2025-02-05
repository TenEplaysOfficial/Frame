import { useParams } from 'react-router-dom';
import APIDATA from '../../api';
import Loader from '../../components/Loader';
import useFetch from '../../hooks/useFetch';
import { MovieTvDataProps } from '../../types';
import CastandCrew from './CastandCrew';

export default function MovieTv() {
  const { type, id } = useParams();
  const { data, isLoading, errorMessage }: MovieTvDataProps = useFetch({
    urlType: 'findByID',
    findByID: id,
    category: type,
  });
  //   console.log('Movie or Tv:', data);

  const Data = Array.isArray(data) ? data[0] : data;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : errorMessage ? (
        <div className="mx-auto text-red-500">{errorMessage}</div>
      ) : (
        <>
          <img
            src={`${APIDATA.IMAGE_w500_BASE_URL}${Data.poster_path}`}
            alt={Data.title || 'No title available'}
            className="w-32 rounded-lg md:w-56"
          />
          <h1>{Data.title}</h1>

          <CastandCrew />
        </>
      )}
    </>
  );
}
