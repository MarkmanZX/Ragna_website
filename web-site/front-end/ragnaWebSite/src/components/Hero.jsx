import '../styles/Hero.css';

function Hero() {
    return(
        <section className="hero">
            <div className="hero-content">
                <h1>RAGNA FC</h1>

                <p>
                    Mais que um time. Uma identidade.
                </p>

                <button onClick={() => window.location.href = '/cast'}>Ver Elenco</button>
            </div>
        </section>
    );
}

export default Hero;