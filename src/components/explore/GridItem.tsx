import { Title2 } from './Title2';

interface GridItemProps {
  title: string;
  data: React.ReactNode;
}

export const GridItem = ({ title, data }: GridItemProps) => {
  const renderData = Array.isArray(data) ? data.join(', ') : data || 'N/A';

  return (
    <span>
      <Title2 title={title} />
      <p className="w-fit text-gray-400 transition-all duration-300 hover:text-white">
        {renderData}
      </p>
    </span>
  );
};
