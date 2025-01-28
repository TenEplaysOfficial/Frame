import { useCallback, useEffect, useState } from 'react';
import APIDATA from '../api';
interface FetchProps {
  urlType: string;
  pageNo?: number;
  category?: string;
  query?: string | null;
  findByID?: string;
}
export default function useFetch({
  pageNo = 1,
  category,
  urlType,
  query,
  findByID,
}: FetchProps) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const generateEndpoint = useCallback(() => {
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
      case 'search':
        endpoint = `/search/multi?query=${query}`;
        break;
      case 'findByID':
        if (!findByID) {
          throw new Error('ID is required for findByID');
        }
        endpoint = `/${category}/${findByID}?language=en-US`;
        break;
      default:
        throw new Error('Invalid urlType');
    }
    return endpoint;
  }, [pageNo, category, query, urlType, findByID]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setErrorMessage('');
      try {
        const endpoint = generateEndpoint();
        const response = await fetch(
          `${APIDATA.API_BASE_URL}${endpoint}`,
          APIDATA.API_OPTIONS,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.results?.length === 0 || data.results === 'False') {
          setErrorMessage('No results found');
          setData([]);
        } else {
          setData(data.results || data);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrorMessage(
            error.message ||
              'Error while fetching data, please try again later',
          );
        } else {
          setErrorMessage('Error while fetching data, please try again later');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [generateEndpoint]);
  return { data, isLoading, errorMessage };
}
