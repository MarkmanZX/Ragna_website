import { Link } from 'react-router-dom';
import '../styles/Hero.css';

function Hero() {
    return(
        <section className="hero">
            <div className="hero-content">
                <h1>RAGNA FC</h1>

                <p>
                    Mais que um time. Uma identidade.
                </p>

                <Link to="/cast">
                    <button>Ver Elenco</button>
                </Link>
            </div>
        </section>
    );
}

export default Hero;