import { useEffect, useState } from 'react';
import TitleExplore from './TitleExplore';
import APIDATA from '../../api';
import { useParams } from 'react-router-dom';
import Loader from '../Loader';
import ErrorMsg from '../ErrorMsg';
import RecommendationsCard from '../RecommendationsCard';
import { RecommendationsDataProps } from '../../types';
import Grid from '../Layout/Grid';

export default function Recommendations() {
  const { id, type } = useParams();
  // console.log(id);

  const [data, setData] = useState<RecommendationsDataProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      setLoading(false);
      setError('Invalid ID');
      return;
    }

    const fetchData = async () => {
      if (!id || !type) {
        setError('Invalid type or ID');
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const endpoint =
          type === 'movie' || type === 'tv'
            ? 'recommendations'
            : 'movie_credits';
        const url = `${APIDATA.API_BASE_URL}/${type}/${id}/${endpoint}`;
        // console.log('Fetching data from:', url);

        const response = await fetch(url, APIDATA.API_OPTIONS);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const res = await response.json();
        // console.log('API Response from Recommendations:', type, res);

        if (!res || Object.keys(res).length === 0) {
          setData([]);
          setError('No data found');
          return;
        }
        // setData(type === 'person' ? res.cast.concat(res.crew) : res.results);
        setData(type === 'person' ? res.cast : res.results);
      } catch (error) {
        setError(`Error fetching data`);
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, type]);

  return (
    <>
      {data.length > 0 && (
        <>
          <TitleExplore title="Recommendations" />
          <section>
            {loading ? (
              <Loader />
            ) : error ? (
              <ErrorMsg msg={error} />
            ) : (
              <Grid>
                {data.map((item, i) => (
                  <RecommendationsCard key={i} {...item} />
                ))}
              </Grid>
            )}
          </section>
        </>
      )}
    </>
  );
}
