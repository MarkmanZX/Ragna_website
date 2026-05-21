import '../styles/Home.css';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import MatchCard from '../components/MatchCard.jsx';

export default function Home() {
    return(
        <div className="home">
            <Navbar />

            <Hero />

            <section className="match-section">
                <MatchCard />
            </section>
        </div>
    );
}