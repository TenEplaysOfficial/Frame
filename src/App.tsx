import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Home from './pages/Home';
import Explore from './pages/Explore';

function App() {
  return (
    <div className="h-full min-h-screen bg-gradient-to-t from-neutral-950 to-[#0B0019] text-white">
      <div className="mx-auto max-w-7xl px-2 pb-12 sm:px-5 md:px-0">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="explore/:media_type/:id" element={<Explore />} />
            <Route path="*" element={<Navigate to={'/'} />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
