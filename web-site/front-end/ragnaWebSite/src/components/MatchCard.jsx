import '../styles/MatchCard.css';

export default function MatchCard(){
    return(
        <div className="match-card">
            <p className="match-label">
                Próximo Jogo
            </p>

            <h2>
                Ragna FC vs Adversário FC
            </h2>

            <p className="match-info">
                Domingo - 15:00 - Society Arena São Paulão
            </p>
        </div>
    );
}