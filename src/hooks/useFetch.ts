import { useEffect, useState } from 'react';
import APIDATA from '../api';
interface FetchProps {
  urlType: string;
  pageNo?: number;
  category?: 'movie' | 'tv';
}
export default function useFetch({
  pageNo = 1,
  category = 'movie',
  urlType,
}: FetchProps) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setErrorMessage('');
      try {
        let endpoint = '';
        switch (urlType) {
          case 'movie':
            endpoint = `/discover/movie?include_adult=false&include_video=true&language=en-US&page=${pageNo}&sort_by=popularity.desc`;
            break;
          case 'tv':
            endpoint = `/discover/tv?include_adult=false&include_video=true&language=en-US&page=${pageNo}&sort_by=popularity.desc`;
            break;
          case 'trending':
            endpoint = `/trending/all/day?language=en-US`;
            break;
          default:
            throw new Error('Invalid urlType');
        }
        const response = await fetch(
          `${APIDATA.API_BASE_URL}${endpoint}`,
          APIDATA.API_OPTIONS,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.results.length === 0 || data.results === 'False') {
          setErrorMessage('No movies found');
          setData([]);
        }
        setData(data.results || []);
      } catch {
        setErrorMessage('Error while fetching data, please try again later');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pageNo, category, urlType]);

  return { data, isLoading, errorMessage };
}
