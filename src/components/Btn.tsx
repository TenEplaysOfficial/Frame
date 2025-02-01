import { Link } from 'lucide-react';

export default function Btn({
  onClick,
  title,
  disabled,
  urlExternal,
  smSize,
}: {
  onClick?: () => void;
  title: string;
  disabled?: boolean;
  urlExternal?: string;
  smSize?: boolean;
}) {
  const button = (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`group mx-2 h-full max-h-16 w-full cursor-pointer rounded-lg border-none px-4 py-2 text-lg font-medium ring-2 ring-white/20 backdrop-blur-xl outline-none hover:ring-white/70 active:bg-indigo-700 active:ring-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:bg-transparent sm:text-xl md:text-2xl ${smSize ? 'h-3 max-w-30' : ''}`}
    >
      {urlExternal ? (
        <span className="flex items-center justify-between gap-x-2">
          {title}
          <Link className="opacity-75 group-hover:opacity-100" />
        </span>
      ) : (
        title
      )}
    </button>
  );

  return <>{urlExternal ? <a href={urlExternal}>{button}</a> : button}</>;
}
