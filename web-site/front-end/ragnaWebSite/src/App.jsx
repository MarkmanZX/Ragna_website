import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Cast from './pages/Cast';
import Games from './pages/Games';
import Gallery from './pages/Gallery';

function App() {
  return(
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cast" element={<Cast />} />
      <Route path="/games" element={<Games />} />
      <Route path="/gallery" element={<Gallery />} />
    </Routes>
    <Footer />
    </>
  );
}

export default App;