import { X } from 'lucide-react';
export default function Search() {
  return (
    <div
      className={`font-fontKanit z-20 mx-auto my-4 flex max-w-xl items-center rounded-xl bg-white/10 px-3 py-1 text-xl font-medium tracking-wider ring-2 ring-zinc-600 placeholder:opacity-85 focus-within:ring-indigo-600`}
    >
      <input
        type="text"
        placeholder="Search"
        //   onChange={(e) => setSearch(e.target.value)}
        //   value={search}
        className="flex-1 border-none bg-transparent py-1 text-lg tracking-widest outline-none placeholder:text-white/65"
      />
      <span>
        <X className="cursor-pointer" />
      </span>
    </div>
  );
}
