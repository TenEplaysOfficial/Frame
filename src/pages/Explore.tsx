import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

export default function Explore() {
  const { id, media_type } = useParams();
  //   console.log('Profile ID:', id);
  // console.log('Profile media_type:', media_type);

  // const { data, isLoading, errorMessage } = useFetch({
  //   urlType: 'findByID',
  //   findByID: id,
  //   category: media_type,
  // });
  console.log('Profile Data:', data);

  return <div className="pt-20"></div>;
}
