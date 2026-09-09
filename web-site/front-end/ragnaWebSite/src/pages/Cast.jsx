import { useEffect, useState } from "react";

import "../pages/Cast.css";

import Pessoa from "../assets/images/pessoa.png";

import { getPlayers } from "../services/playersService";


function calculateAge(birthDate) {

    if (!birthDate) {
        return "";
    }

    const today = new Date();

    const birth = new Date(`${birthDate}T00:00:00`);

    let age =
        today.getFullYear() -
        birth.getFullYear();

    const monthDifference =
        today.getMonth() -
        birth.getMonth();

    if (
        monthDifference < 0 ||
        (
            monthDifference === 0 &&
            today.getDate() < birth.getDate()
        )
    ) {

        age--;

    }

    return age;

}


function Cast() {

    const [players, setPlayers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);


    useEffect(() => {

        async function loadPlayers() {

            try {

                setLoading(true);

                setError(null);


                const data = await getPlayers();


                setPlayers(data || []);


            } catch (error) {

                console.error(
                    "Erro ao carregar elenco:",
                    error
                );


                setError(
                    "Não foi possível carregar o elenco."
                );


            } finally {

                setLoading(false);

            }

        }


        loadPlayers();

    }, []);


    return (

        <div className="castFull">


            <div className="top">

                <button
                    className="back-button"
                    onClick={() => {
                        window.location.href = "/";
                    }}
                >
                    ◀
                </button>


                <h1>
                    Elenco
                </h1>

            </div>


            <div className="containerCast">


                <div className="placeCast">


                    {loading && (

                        <p>
                            Carregando elenco...
                        </p>

                    )}


                    {!loading && error && (

                        <p>
                            {error}
                        </p>

                    )}


                    {!loading &&
                        !error &&
                        players.length === 0 && (

                            <p>
                                Nenhum jogador cadastrado.
                            </p>

                        )
                    }


                    {!loading &&
                        !error &&
                        players.length > 0 && (

                            players.map((player) => (

                                <div
                                    className="cardCast"
                                    key={player.id}
                                >


                                    <img
                                        src={
                                            player.photo_url
                                                ? player.photo_url
                                                : Pessoa
                                        }
                                        alt={player.name}
                                    />


                                    <h2>
                                        {player.name}
                                    </h2>


                                    <p>

                                        {calculateAge(
                                            player.birth_date
                                        )}

                                        {player.birth_date &&
                                            " anos"
                                        }

                                        {" - "}

                                        {player.position}

                                        {" - "}

                                        {player.dominant_foot}

                                    </p>


                                </div>

                            ))

                        )
                    }


                </div>


            </div>


        </div>

    );

}


export default Cast;