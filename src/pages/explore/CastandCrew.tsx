import { useParams } from 'react-router-dom';
import CastandCrewProfileCard from '../../components/explore/CastandCrewProfileCard';
import { useEffect, useState } from 'react';
import APIDATA from '../../api';

export default function CastandCrew() {
  const { id, type } = useParams();
  const safeType = type || '';
  const [credits, setCredits] = useState<{
    cast: {
      id: number;
      name: string;
      profile_path: string;
      character: string;
    }[];
    crew: { id: number; name: string; profile_path: string; job: string }[];
  }>({
    cast: [],
    crew: [],
  });

  useEffect(() => {
    if (!id || !type) return;
    const fetchCredits = async () => {
      try {
        const response = await fetch(
          `${APIDATA.API_BASE_URL}/${type}/${id}/credits`,
          APIDATA.API_OPTIONS,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const creditsData = await response.json();
        setCredits({
          cast: creditsData.cast || [],
          crew: creditsData.crew || [],
        });
      } catch (error) {
        console.error('Error fetching credits:', error);
      }
    };
    fetchCredits();
  }, [id, type]);

  if (safeType !== 'movie' && safeType !== 'tv') {
    return null;
  }

  return (
    <>
      <h1>Crew</h1>
      <div className="flex flex-wrap gap-4">
        {credits.crew
          .filter((member) =>
            ['Director', 'Producer', 'Writer'].includes(member.job),
          )
          .map(
            (crew) =>
              crew.profile_path && (
                <CastandCrewProfileCard
                  key={crew.id}
                  id={crew.id}
                  profile_path={crew.profile_path}
                  name={crew.name}
                  job={crew.job}
                />
              ),
          )}
      </div>

      <div className="flex flex-wrap gap-4">
        {credits.cast
          .slice(0, 10)
          .map(
            (actor) =>
              actor.profile_path && (
                <CastandCrewProfileCard
                  key={actor.id}
                  id={actor.id}
                  profile_path={actor.profile_path}
                  name={actor.name}
                  job={actor.character}
                />
              ),
          )}
      </div>
    </>
  );
}
