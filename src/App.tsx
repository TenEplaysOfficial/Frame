import { BrowserRouter as Router, Navigate, useRoutes } from 'react-router-dom';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Movies from './pages/section/Movies';
import ScrollToTop from './components/ScrollToTop';
import Nav from './components/Nav';

const AppRoutes = () => {
  const routes = [
    { path: '/', element: <Home /> },
    {
      path: 'explore/movie',
      element: <Navigate to="/explore/movies" replace />,
    },
    {
      path: 'explore/movie/',
      element: <Navigate to="/explore/movies" replace />,
    },
    { path: 'explore/movies', element: <Movies /> },
    { path: 'explore/:type/:id', element: <Explore /> },
    { path: '*', element: <Navigate to="/" /> },
  ];

  return useRoutes(routes);
};
function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Router>
        <Nav />
        <div className="mx-auto max-w-7xl px-2 pb-12">
          <ScrollToTop />
          <AppRoutes />
        </div>
      </Router>
    </div>
  );
}

export default App;
