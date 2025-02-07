import Search from '../components/Search';
import Trending from './section/Trending';

export default function Home() {
  return (
    <main>
      <header className="flex min-h-[75vh] w-full flex-col items-center justify-center">
        <div className="cursor-default">
          {/* <h1 className="mb-2 text-6xl font-bold">Frame</h1> */}
          <p className="font-primary mb-9 text-center text-4xl font-extrabold">
            Your Gateway to Explore Movies, TV Shows, and Beyond
          </p>
        </div>
        <Search />
      </header>
      <Trending />
    </main>
  );
}
