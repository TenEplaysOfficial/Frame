import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';

const NavData = [
  {
    title: 'Home',
    link: '/',
  },
  {
    title: 'Explore',
    link: 'explore',
  },
  {
    title: 'Movies',
    link: 'explore/movies',
  },
];

export default function Nav() {
  return (
    <AnimatePresence>
      <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between rounded-b-2xl bg-zinc-950 px-2 sm:px-2 md:px-8 lg:px-28">
        <Link to={'/'}>
          <motion.h1 className="text-3xl font-bold tracking-wider">
            Frame
          </motion.h1>
        </Link>
        <nav>
          <ul className="flex items-center space-x-4">
            {NavData.map((d, i) => (
              <Link key={i} to={d.link}>
                <li className="relative text-2xl">
                  {d.title}
                  <span className="absolute bottom-0 left-0 h-3 w-full origin-left scale-x-0 bg-sky-400 transition-all duration-300 hover:scale-x-100"></span>
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      </header>
    </AnimatePresence>
  );
}
