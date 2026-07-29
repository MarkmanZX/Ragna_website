import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Cast from './pages/Cast';
import Games from './pages/Games';
import Gallery from './pages/Gallery';
import Login from './pages/Login';
import Register from './pages/Register';
import {useAuth} from './hooks/useAuth';

function App() {
  const { user } = useAuth();

  console.log("Loading:", loading);
  console.log("Usuário:", user);
  return(
    <div className="app">
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cast" element={<Cast />} />
      <Route path="/games" element={<Games />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    <Footer />
    </div>
  );
}

export default App;