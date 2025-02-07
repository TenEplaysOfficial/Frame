import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PersonDataProps } from '../../types';
import APIDATA from '../../api';
import Loader from '../../components/Loader';
import Grid from '../../components/Layout/Grid';
import { GridItem } from '../../components/explore/GridItem';
import TitleExplore from '../../components/explore/TitleExplore';

export default function Person() {
  const { id } = useParams();
  // console.log(id);

  const [data, setData] = useState<PersonDataProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      setLoading(false);
      setError('Invalid ID');
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
        // console.log('API Response:', res);

        if (!res || Object.keys(res).length === 0) {
          setError('No data found');
          return;
        }

        setData(res);
      } catch (error) {
        setError(`Error fetching data`);
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : data ? (
        <section className="font-para">
          <img
            src={`${APIDATA.IMAGE_w500_BASE_URL}${data.profile_path || ''}`}
            alt={data.name || 'No title available'}
            loading="lazy"
            className="w-32 rounded-lg md:w-56"
          />

          <h1 className="font-primary text-lg sm:text-xl">{data.name}</h1>

          <span className="text-gray-400">
            {data.gender === 2 ? 'Male' : 'Female'}
          </span>
          <TitleExplore title="Details" />
          <p>{data.biography}</p>
          <Grid columns="grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <GridItem title="Birthday" data={data.birthday} />
            {data.deathday && (
              <GridItem title="Deathday" data={data.deathday} />
            )}
            <GridItem
              title="Gender"
              data={data.gender === 2 ? 'Male' : 'Female'}
            />
            <GridItem title="Place of birth" data={data.place_of_birth} />
            <GridItem
              title="Known for department"
              data={data.known_for_department}
            />
            <GridItem title="Also known as" data={data.also_known_as} />
          </Grid>
        </section>
      ) : (
        <div>No data available</div>
      )}
    </>
  );
}
