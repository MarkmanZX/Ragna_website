import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logoRagna from '../assets/images/logoRagna.png';

function Navbar() {
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
            </ul>
        </nav>
    );
}

export default Navbar;