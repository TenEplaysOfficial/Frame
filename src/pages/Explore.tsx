import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import APIDATA from '../api';
import { ReactNode, useEffect, useState, useTransition } from 'react';
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
  const { type } = useParams();

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
            <div className="relative">
              <div
                className={`${type === 'person' ? 'hidden' : 'md:min-h-[60vh]'} `}
              >
                <img
                  src={`${APIDATA.IMAGE_Backdrop_BASE_URL}${backdropImage}`}
                  alt={data.original_name || 'No title available'}
                  className={`max-h-[60vh] w-full rounded-b-lg object-cover lg:object-top ${
                    isPending ? 'opacity-50' : 'opacity-100'
                  }`}
                />
              </div>
              <div
                className={`${type === 'person' ? '' : 'absolute'} bottom-2 left-0 flex items-center gap-2 p-2 shadow-2xl sm:left-2`}
              >
                <img
                  src={`${APIDATA.IMAGE_w500_BASE_URL}${posterImage || data.profile_path}`}
                  alt={data.original_name || 'No title available'}
                  className={`rounded-lg ${
                    isPending ? 'opacity-50' : 'opacity-100'
                  } ${type === 'person' ? 'w-32 md:w-56' : 'w-22 sm:w-40'} `}
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
                  {data.tagline ||
                    (data.gender &&
                      `${data.gender === 2 ? 'Male' : 'Female'} ${data.birthday}${data.deathday ? ` - ${data.deathday}` : ''}`)}
                </p>
              </div>
              {data.homepage && (
                <Btn title="Visit" urlExternal={data.homepage} smSize />
              )}
            </div>
            <div className="flex flex-col">
              <p className="text-justify text-lg font-medium tracking-wide">
                {data.overview || data.biography}
              </p>
              {data.also_known_as && (
                <DetailsInline title="Also know as se:">
                  {data.also_known_as.map((d, i) => (
                    <Gen key={i} title={d} />
                  ))}
                </DetailsInline>
              )}
              {data.place_of_birth && (
                <DetailsInline title="Place of Birth :">
                  <p>{data.place_of_birth}</p>
                </DetailsInline>
              )}
              {data.release_date && (
                <DetailsInline title="Release Date :">
                  <p>{isLoading ? 'Loading...' : data.release_date}</p>
                </DetailsInline>
              )}
              {data.vote_average && (
                <DetailsInline title="Vote Average : ">
                  <p>{isLoading ? 'Loading...' : data.vote_average}</p>
                </DetailsInline>
              )}
              {data.known_for_department && (
                <DetailsInline title="Known for :">
                  <p>{isLoading ? 'Loading...' : data.known_for_department}</p>
                </DetailsInline>
              )}
              {data.budget !== 0 && (
                <DetailsInline title="Budget:">
                  <p>{data.budget}</p>
                </DetailsInline>
              )}
              {/*
               <DetailsInline title=":">
              </DetailsInline> 
              */}
              <p>{data.release_date}</p>
              <p>{data.revenue}</p>
              <p>{data.runtime}</p>
              <p>{data.vote_count}</p>
              <Title2 title="Genres:" />
              <div className="flex flex-wrap">
                {data?.genres?.map((d, index) => (
                  <Gen key={index} title={d.name || 'N/A'} />
                ))}
              </div>
              <Title2 title="Production Companies:" />
              <div className="flex flex-wrap">
                {data.production_companies?.map((d, index) => (
                  <>
                    {/* {d.logo_path && ( <img src={`${APIDATA.IMAGE_Backdrop_BASE_URL}${d.logo_path}`} className="w-20" /> )} */}
                    <Gen key={index} title={d.name || 'N/A'} />
                  </>
                ))}
              </div>
              <Title2 title="Spoken Languages:" />
              <div className="flex flex-wrap">
                {data.spoken_languages?.map((d, index) => (
                  <Gen key={index} title={d.name || 'N/A'} />
                ))}
              </div>
            </div>
          </section>
        )
      )}
    </>
  );
};

const Gen = ({ title }: { title: string }) => {
  return <p className="size-fit border p-2">{title}</p>;
};

const Title2 = ({ title }: { title?: string }) => {
  return <h3 className="text-lg">{title}</h3>;
};

const DetailsInline = ({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) => {
  return (
    <div className="inline-flex flex-wrap items-center space-x-1">
      <Title2 title={title} />
      {children}
    </div>
  );
};
