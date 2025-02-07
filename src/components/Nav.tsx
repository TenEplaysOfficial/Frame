import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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
    <header className="sticky top-0 z-50 mx-auto flex min-h-16 max-w-7xl items-center justify-between rounded-b-2xl bg-zinc-950 px-2">
      <Link to={'/'}>
        <h1 className="font-primary text-3xl font-bold tracking-wider uppercase">
          Frame
        </h1>
      </Link>
      <nav>
        <MobileNav />
        <DesktopNav />
      </nav>
    </header>
  );
}

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle mobile menu"
        className="flex cursor-pointer flex-col gap-[0.35rem]"
      >
        <span
          className={`h-1 w-9 origin-center rounded-full bg-white transition-all duration-300 ${isOpen ? 'translate-y-2 rotate-45' : ''}`}
        />
        <span
          className={`h-1 w-9 origin-center rounded-full bg-white transition-all delay-100 duration-300 ${isOpen ? 'scale-x-0 opacity-0' : ''}`}
        />
        <span
          className={`h-1 w-9 origin-center rounded-full bg-white transition-all duration-300 ${isOpen ? '-translate-y-2.5 -rotate-45' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.3,
            }}
            className="fixed top-16 right-0 bottom-0 left-0 z-40 flex flex-col items-center bg-black/50 pl-2 backdrop-blur-xs"
          >
            <ul>
              {NavData.map((d, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: i * 0.1, duration: 0.3 },
                  }}
                  exit={{ opacity: 0, y: -50, transition: { duration: 0.3 } }}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <Link to={d.link}>
                    <List title={d.title} customStyle="text-left m-2" />
                  </Link>
                </motion.span>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DesktopNav = () => {
  return (
    <ul className="hidden items-center space-x-4 lg:flex">
      {NavData.map((d, i) => (
        <Link key={i} to={d.link}>
          <List title={d.title} />
        </Link>
      ))}
    </ul>
  );
};

const List = ({
  title,
  customStyle = '',
}: {
  title: string;
  customStyle?: string;
}) => {
  return (
    <li
      className={`font-style text-2xl font-semibold tracking-wider ${customStyle}`}
    >
      {title}
    </li>
  );
};
