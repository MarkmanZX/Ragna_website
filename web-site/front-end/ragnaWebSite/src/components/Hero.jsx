import { Link } from 'react-router-dom';
import '../styles/Hero.css';
import Logo from '../assets/images/logoRagna.png';

function Hero() {
    return(
        <section className="hero">

            <div className="hero-background">
                <img src={Logo}/>
            </div>

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