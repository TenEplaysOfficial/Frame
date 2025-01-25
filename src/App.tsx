import { useState } from 'react';
import Search from './components/Search';
import Movies from './pages/section/Movies';
import Trending from './pages/section/Trending';

function App() {
  const [search, setSearch] = useState('');

  return (
    <main className="h-full min-h-screen bg-gradient-to-t from-neutral-950 to-[#0B0019] text-white">
      <div className="mx-auto max-w-7xl px-2 pb-12 sm:px-5 md:px-0">
        <header>
          <Search value={search} setSearch={setSearch} />
        </header>
        <Trending />
        <Movies />
      </div>
    </main>
  );
}

export default App;
