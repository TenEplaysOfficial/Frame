import { useParams } from 'react-router-dom';
import APIDATA from '../../api';
import Loader from '../../components/Loader';
import useFetch from '../../hooks/useFetch';
import { MovieTvDataProps } from '../../types';
import CastandCrew from '../../components/explore/CastandCrew';
import TitleExplore from '../../components/explore/TitleExplore';
import Grid from '../../components/Layout/Grid';
import { convertMinutesToTimeFormat } from '../../utils/convertMinutesToTimeFormat';
import { GridItem } from '../../components/explore/GridItem';

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
        <section className="font-para">
          <img
            src={`${APIDATA.IMAGE_w500_BASE_URL}${Data.poster_path}`}
            alt={Data.title || 'No title available'}
            loading="lazy"
            className="w-32 rounded-lg sm:w-42 md:w-56"
          />

          <h1 className="font-primary text-lg sm:text-xl">
            {Data.title || Data.original_title || Data.name}
          </h1>

          <span className="text-gray-400">{Data.tagline}</span>

          <TitleExplore title="Details" />
          <p>{Data.overview}</p>

          <Grid columns="grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <GridItem title="Origin Country" data={Data.origin_country} />
            <GridItem title="Original Language" data={Data.original_language} />
            <GridItem
              title="Release Date"
              data={Data.release_date?.replace(/-/g, ' / ')}
            />
            <GridItem
              title="Runtime"
              data={
                Data.runtime
                  ? convertMinutesToTimeFormat({ n: Data.runtime })
                  : null
              }
            />
            <GridItem title="Status" data={Data.status} />
            <GridItem title="Budget" data={Data.budget} />
            <GridItem title="Revenue" data={Data.revenue} />
            <GridItem
              title="Vote Average"
              data={Data.vote_average?.toFixed(1)}
            />
            <GridItem title="Popularity" data={Data.popularity?.toFixed(2)} />
            <GridItem
              title="Spoken Languages"
              data={Data.spoken_languages?.map(
                (language) => language.english_name || language.name,
              )}
            />
            <GridItem
              title="Genres"
              data={Data.genres?.map((genre) => genre.name)}
            />
            <GridItem
              title="Production Companies"
              data={Data.production_companies?.map((company) => company.name)}
            />
          </Grid>
          <CastandCrew />
        </section>
      )}
    </>
  );
}
