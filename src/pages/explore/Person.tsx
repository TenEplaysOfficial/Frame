import { useParams } from 'react-router-dom';
import { PersonDataProps } from '../../types';
import APIDATA from '../../api';
import { useEffect, useState } from 'react';

export default function Person() {
  const { id } = useParams();
  const [data, setData] = useState<PersonDataProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError('Invalid parameters');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `${APIDATA.API_BASE_URL}/person/${id}`;
        console.log('Fetching data from:', url);

        const response = await fetch(url, APIDATA.API_OPTIONS);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const res = await response.json();
        console.log('API Response:', res);

        if (res) {
          setData(res);
        } else {
          setError('No data found');
        }
      } catch (error) {
        setError(`Error fetching data`);
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      <h1>Person</h1>
      {data ? (
        <div>
          <img
            src={`${APIDATA.IMAGE_w500_BASE_URL}${data.profile_path}`}
            alt={data.name || 'No title available'}
            className="w-32 rounded-lg md:w-56"
          />
          <p>{data.name}</p>
        </div>
      ) : (
        <div>No data available</div>
      )}
    </>
  );
}
