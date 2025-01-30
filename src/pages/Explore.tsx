import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
// import Loader from '../components/Loader';
import APIDATA from '../api';
import { useEffect, useState, useTransition } from 'react';
import { DetailsProps } from '../types';
import Btn from '../components/Btn';

export default function Explore() {
  const { id, type } = useParams();

  const { data, isLoading, errorMessage } = useFetch({
    urlType: 'findByID',
    findByID: id,
    category: type,
  });
  // console.log('Profile Data:', data);

  return (
    <Details
      errorMessage={errorMessage}
      isLoading={isLoading}
      data={Array.isArray(data) ? data[0] : data}
    />
  );
}

const Details = ({ data, isLoading, errorMessage }: DetailsProps) => {
  const [isPending, startTransition] = useTransition();
  const [backdropImage, setBackdropImage] = useState<string | null>(null);
  const [posterImage, setPosterImage] = useState<string | null>(null);

  useEffect(() => {
    startTransition(() => {
      const availableBackdrops = [
        data?.backdrop_path,
        data?.belongs_to_collection?.backdrop_path,
      ].filter(Boolean);

      if (availableBackdrops.length > 0) {
        setBackdropImage(
          availableBackdrops[
            Math.floor(Math.random() * availableBackdrops.length)
          ],
        );
      }
      const availablePosters = [
        data?.poster_path,
        data?.belongs_to_collection?.poster_path,
      ].filter(Boolean);
      if (availablePosters.length > 0) {
        setPosterImage(
          availablePosters[Math.floor(Math.random() * availablePosters.length)],
        );
      }
    });
  }, [data]);

  return (
    <>
      {errorMessage ? (
        <div className="mx-auto text-red-500">{errorMessage}</div>
      ) : (
        data && (
          <section>
            <div className="relative md:min-h-[60vh]">
              {backdropImage && (
                <img
                  src={`${APIDATA.IMAGE_Backdrop_BASE_URL}${backdropImage}`}
                  alt={data.original_name || 'No title available'}
                  className={`max-h-[60vh] w-full rounded-b-lg object-cover ${
                    isPending ? 'opacity-50' : 'opacity-100'
                  }`}
                />
              )}
              <div
                className={`absolute bottom-2 left-0 flex items-center gap-2 p-2 shadow-2xl sm:left-2`}
              >
                <img
                  src={`${APIDATA.IMAGE_w500_BASE_URL}${posterImage}`}
                  alt={data.original_name || 'No title available'}
                  className={`w-22 rounded-lg sm:w-56 ${
                    isPending ? 'opacity-50' : 'opacity-100'
                  }`}
                />
              </div>
            </div>
            <div className="iterms-center flex justify-between pt-3">
              <div>
                <h2 className="text-4xl font-bold">
                  {isLoading
                    ? 'Loading...'
                    : data.name || data.title || data.original_name}
                </h2>
                <p className="text-lg font-light text-gray-200/85">
                  {data.tagline}
                </p>
              </div>
              <Btn title="Visit" urlExternal={data.homepage} smSize />
            </div>
            <p>{data.overview}</p>

            {data.release_date && (
              <>
                <Title2 title="Release Date:" />
                <p>{isLoading ? 'Loading...' : data.release_date}</p>
              </>
            )}
            <p>Vote Average: {isLoading ? 'Loading...' : data.vote_average}</p>
            <p>{isLoading ? 'Loading...' : data.known_for_department}</p>
            <p>{data.budget}</p>
            <p>{data.profile_path}</p>
            <p>{data.release_date}</p>
            <p>{data.revenue}</p>
            <p>{data.runtime}</p>
            <p>{data.vote_count}</p>

            <Title2 title="Genres:" />
            <div className="flex flex-wrap">
              {data?.genres.map((d, index) => (
                <Gen key={index} title={d.name || 'N/A'} />
              ))}
            </div>

            <Title2 title="Production Companies:" />
            <div className="flex flex-wrap">
              {data.production_companies.map((d, index) => (
                <>
                  {/* {d.logo_path && ( <img src={`${APIDATA.IMAGE_Backdrop_BASE_URL}${d.logo_path}`} className="w-20" /> )} */}
                  <Gen key={index} title={d.name || 'N/A'} />
                </>
              ))}
            </div>
            <Title2 title="Spoken Languages:" />
            <div className="flex flex-wrap">
              {data.spoken_languages.map((d, index) => (
                <Gen key={index} title={d.name || 'N/A'} />
              ))}
            </div>
          </section>
        )
      )}
    </>
  );
};

const Gen = ({ title }: { title: string }) => {
  return <p className="size-fit border p-2 text-nowrap">{title}</p>;
};

const Title2 = ({ title }: { title: string }) => {
  return <h3 className="text-lg">{title}</h3>;
};
