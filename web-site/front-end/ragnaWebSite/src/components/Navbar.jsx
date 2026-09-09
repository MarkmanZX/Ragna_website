import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logoRagna from '../assets/images/logoRagna.png';
import { useAuth } from '../hooks/useAuth';

function Navbar() {
    const { role, user, logout } = useAuth();
    return(
        <nav className="navbar">
            <img src={logoRagna} className="logoRagna" />
            <ul className="nav-links">
                <li>
                    <Link to="/"> Home </Link>
                </li>
                <li>
                    <Link to="/cast"> Elenco </Link>
                </li>
                <li>
                    <Link to="/games"> Jogos </Link>
                </li>
                <li>
                    <Link to="/gallery"> Galeria </Link>
                </li>
                {!user ? (
                    <li>
                        <Link to="/login"> Login</Link>
                    </li>
                ) : (
                    <>
                    {role === "admin" && (
                        <li>
                            <Link to="/admin"> Admin Painel</Link>
                        </li>
                    )}
                    <li>
                        <button onClick={logout} className="logout-btn">
                            Sair
                        </button>
                    </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;