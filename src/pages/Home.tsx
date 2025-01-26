import Search from '../components/Search';
import Movies from './section/Movies';
import Trending from './section/Trending';

export default function Home() {
  return (
    <main>
      <header className="flex min-h-[75vh] w-full flex-col items-center justify-center">
        <div className="cursor-default">
          <h1 className="mb-2 text-6xl font-bold">Frame</h1>
          <p className="mb-9 text-2xl font-medium">
            Your Gateway to Explore Movies, TV Shows, and Beyond
          </p>
        </div>
        <Search />
      </header>
      <Trending />
      <Movies />
    </main>
  );
}
