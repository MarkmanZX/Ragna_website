import '../styles/Navbar.css';

export default function Navbar() {
    return(
        <nav className="navbar">
            <h1 className="logo"> Ragna FC </h1>
            <ul className="nav-links">
                <li>Home</li>
                <li>Elenco</li>
                <li>Jogos</li>
                <li>Galeria</li>
            </ul>
        </nav>
    );
}