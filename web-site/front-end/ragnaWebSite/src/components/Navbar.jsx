import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
    return(
        <nav className="navbar">
            <h1 className="logo"> Ragna FC </h1>
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