import { SearchIcon, X } from 'lucide-react';
interface SearchProps {
  value: string;
  setSearch: (value: string) => void;
}

export default function Search({ value, setSearch }: SearchProps) {
  // console.log('Search rendered',value);
  return (
    <div
      className={`font-fontKanit z-20 mx-auto mb-4 flex max-w-xl items-center rounded-xl bg-white/10 px-3 py-1 text-xl font-medium tracking-wider ring-2 ring-zinc-600 placeholder:opacity-85 focus-within:ring-indigo-600`}
    >
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
        value={value}
        className="flex-1 border-none bg-transparent py-1 text-lg tracking-widest outline-none placeholder:text-white/65"
      />
      <span>
        {value ? (
          <X
            className={`cursor-pointer ${value ? 'opacity-100' : 'opacity-0'} transition-all duration-300`}
            onClick={() => setSearch('')}
          />
        ) : (
          <SearchIcon
            className={`cursor-pointer ${value ? 'opacity-0' : 'opacity-100'} transition-all duration-300`}
          />
        )}
      </span>
    </div>
  );
}
