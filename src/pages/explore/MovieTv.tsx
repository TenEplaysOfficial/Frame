import { useParams } from 'react-router-dom';
import APIDATA from '../../api';
import Loader from '../../components/Loader';
import useFetch from '../../hooks/useFetch';
import { MovieTvDataProps } from '../../types';
import CastandCrew from '../../components/explore/CastandCrew';
import TitleExplore from '../../components/explore/TitleExplore';
import Grid from '../../components/Layout/Grid';
import { convertMinutesToTimeFormat } from '../../utils/convertMinutesToTimeFormat';

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

          <h1 className="font-primary text-lg sm:text-xl">{Data.title}</h1>

          <span className="text-gray-400">{Data.tagline}</span>

          <TitleExplore title="Details" />
          <p>{Data.overview}</p>

          <Grid>
            <span>
              <Title2 title="Budget" />
              <p>{Data.budget ? Data.budget : 'N/A'}</p>
            </span>
            <span>
              <Title2 title="Origin Country" />
              <p>{Data.origin_country}</p>
            </span>
            <span>
              <Title2 title="Original Language" />
              <p>{Data.original_language}</p>
            </span>
            <span>
              <Title2 title="Release Date" />
              <p>{Data.release_date?.replace(/-/g, ' / ')}</p>
            </span>
            <span>
              <Title2 title="Revenue" />
              <p>{Data.revenue}</p>
            </span>
            <span>
              <Title2 title="Runtime" />
              <p>
                {Data.runtime
                  ? convertMinutesToTimeFormat({ n: Data.runtime })
                  : 'N/A'}
              </p>
            </span>
            <span>
              <Title2 title="Status" />
              <p>{Data.status}</p>
            </span>
            <span>
              <Title2 title="Vote Average" />
              <p>{Data.vote_average?.toFixed(1)}</p>
            </span>
            <span>
              <Title2 title="Production Companies" />
              <p>
                {Data.production_companies?.map((company) => (
                  <span key={company.id}>{company.name} </span>
                ))}
              </p>
            </span>
            <span>
              <Title2 title="Spoken Languages" />
              <p>
                {Data.spoken_languages?.map((d, i) => (
                  <span key={i}>{d.english_name || d.name}</span>
                ))}
              </p>
            </span>
            <span>
              <Title2 title="Genres" />
              <p>
                {Data.genres?.map((d) => (
                  <span key={d.id}>
                    {d.name}
                    <br />
                  </span>
                ))}
              </p>
            </span>
          </Grid>
          <CastandCrew />
        </section>
      )}
    </>
  );
}

const Title2 = ({ title }: { title: string }) => {
  return <h6 className="font-secondary font-semibold">{title}</h6>;
};
