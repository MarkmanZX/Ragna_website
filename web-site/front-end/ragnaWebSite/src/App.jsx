import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Cast from './pages/Cast';
import Games from './pages/Games';
import Gallery from './pages/Gallery';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuth } from './hooks/useAuth';
import Admin from './pages/Admin';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {

  const { user, profile, loading } = useAuth();

  console.log("Loading:", loading);
  console.log("Usuário:", user);
  console.log("Perfil:", profile);

  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cast" element={<Cast />} />
        <Route path="/games" element={<Games />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={
          <ProtectedRoute adminOnly={true}>
            <Admin />
          </ProtectedRoute>
        } 
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;