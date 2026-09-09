import { useState, useEffect } from "react";
import "../pages/Games.css";

import Pessoa from "../assets/images/pessoa.png";
import { getGames } from "../services/GamesService";
function Games() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadGames() {
            try {
                setLoading(true);
                setError(null);

                const data = await getGames();

                setGames(data || []);
            } catch (err) {
                console.error("Erro ao carregar jogos:", err);

                setError("Não foi possível carregar os jogos.");
            } finally {
                setLoading(false);
            }
        }

        loadGames();
    }, []);

    function formatDate(date) {
        if (!date) return "";

        const parts = date.split("-");

        if (parts.length !== 3) {
            return date;
        }

        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }

    function formatTime(time) {
        if (!time) return "";

        return time.substring(0, 5);
    }

    return (
        <div className="gamesFull">

            <div className="top">

                <button
                    className="back-button"
                    onClick={() => {
                        window.location.href = "/";
                    }}
                >
                    ◀
                </button>

                <h1>Jogos</h1>

            </div>

            <div className="containerGame">

                <div className="placeGame">

                    {loading && (
                        <p>Carregando jogos...</p>
                    )}

                    {!loading && error && (
                        <p>{error}</p>
                    )}

                    {!loading &&
                        !error &&
                        games.length === 0 && (
                            <p>Nenhum jogo cadastrado.</p>
                        )}

                    {!loading &&
                        !error &&
                        games.length > 0 &&
                        games.map((gameData) => (

                            <div
                                className="cardGame"
                                key={gameData.id}
                            >

                                <div className="teamsGame">

                                    <div className="allyTeamGame">

                                        <img
                                            src={
                                                gameData.escudo_time_casa ||
                                                Pessoa
                                            }
                                            alt={`Escudo ${gameData.time_casa}`}
                                        />

                                        <h2>
                                            {gameData.time_casa}
                                        </h2>

                                    </div>

                                    <div className="versus">
                                        ✖️
                                    </div>

                                    <div className="enemyTeamGame">

                                        <img
                                            src={
                                                gameData.escudo_time_visitante ||
                                                Pessoa
                                            }
                                            alt={`Escudo ${gameData.time_visitante}`}
                                        />

                                        <h2>
                                            {gameData.time_visitante}
                                        </h2>

                                    </div>

                                </div>

                                <div className="gameInfo">

                                    <p>
                                        local: {gameData.local}
                                    </p>

                                    <p>
                                        data: {formatDate(gameData.data)}
                                    </p>

                                    <p>
                                        horário: {formatTime(gameData.horario)}
                                    </p>

                                </div>

                            </div>

                        ))}

                </div>

            </div>

        </div>
    );
}

export default Games;