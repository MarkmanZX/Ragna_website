import { useState, useEffect } from "react";

import { supabase } from "../../../services/supabase";

import {
    createGame,
    getGames,
    updateGame,
    deleteGame
} from "../../../services/GamesService";

import { uploadTeamLogo } from "../../../services/StorageService";


function GamesManager() {

    console.log("GAMES MANAGER FOI CARREGADO");

    const [games, setGames] = useState([]);

    const [loading, setLoading] = useState(false);

    const [editingGame, setEditingGame] = useState(null);

    const [game, setGame] = useState({
        time_casa: "",
        time_visitante: "",
        escudo_time_casa: "",
        escudo_time_visitante: "",
        local: "",
        data: "",
        horario: ""
    });

    const [logoCasa, setLogoCasa] = useState(null);

    const [logoVisitante, setLogoVisitante] = useState(null);


    // ==========================================
    // CARREGAR JOGOS
    // ==========================================

    useEffect(() => {

        loadGames();

    }, []);


    async function loadGames() {

        try {

            const data = await getGames();

            setGames(data || []);

        } catch (error) {

            console.error(
                "Erro ao carregar jogos:",
                error
            );

        }

    }


    // ==========================================
    // VERIFICAR ADMINISTRADOR
    // ==========================================

    async function checkAdmin() {

        const {
            data,
            error
        } = await supabase.rpc("is_admin");


        console.log(
            "IS ADMIN:",
            data
        );


        console.log(
            "ADMIN ERROR:",
            error
        );


        if (error) {

            console.error(
                "Erro ao verificar administrador:",
                error
            );

            throw new Error(
                "Erro ao verificar permissão de administrador."
            );

        }


        if (!data) {

            throw new Error(
                "Você não possui permissão de administrador."
            );

        }


        return true;

    }


    // ==========================================
    // ALTERAR CAMPOS
    // ==========================================

    function handleChange(event) {

        const {
            name,
            value
        } = event.target;


        setGame((previous) => {

            return {
                ...previous,
                [name]: value
            };

        });

    }


    // ==========================================
    // ESCUDO DO TIME DA CASA
    // ==========================================

    function handleLogoCasa(event) {

        const file =
            event.target.files[0] || null;


        setLogoCasa(file);

    }


    // ==========================================
    // ESCUDO DO TIME VISITANTE
    // ==========================================

    function handleLogoVisitante(event) {

        const file =
            event.target.files[0] || null;


        setLogoVisitante(file);

    }


    // ==========================================
    // LIMPAR FORMULÁRIO
    // ==========================================

    function resetForm() {

        setGame({
            time_casa: "",
            time_visitante: "",
            escudo_time_casa: "",
            escudo_time_visitante: "",
            local: "",
            data: "",
            horario: ""
        });


        setLogoCasa(null);

        setLogoVisitante(null);


        const fileInputs =
            document.querySelectorAll(
                '.games-manager input[type="file"]'
            );


        fileInputs.forEach((input) => {

            input.value = "";

        });

    }


    // ==========================================
    // CADASTRAR / EDITAR
    // ==========================================

    async function handleSubmit(event) {

        event.preventDefault();


        if (
            !game.time_casa ||
            !game.time_visitante ||
            !game.local ||
            !game.data ||
            !game.horario
        ) {

            alert(
                "Preencha todos os campos obrigatórios."
            );

            return;

        }


        try {

            setLoading(true);


            // --------------------------------------
            // VERIFICAR ADMIN
            // --------------------------------------

            await checkAdmin();


            // --------------------------------------
            // URLs DOS ESCUDOS
            // --------------------------------------

            let escudoCasa =
                game.escudo_time_casa;

            let escudoVisitante =
                game.escudo_time_visitante;


            // --------------------------------------
            // UPLOAD ESCUDO CASA
            // --------------------------------------

            if (logoCasa) {

                console.log(
                    "Enviando escudo do time da casa:",
                    logoCasa.name
                );


                escudoCasa =
                    await uploadTeamLogo(
                        logoCasa
                    );


                console.log(
                    "URL escudo casa:",
                    escudoCasa
                );

            }


            // --------------------------------------
            // UPLOAD ESCUDO VISITANTE
            // --------------------------------------

            if (logoVisitante) {

                console.log(
                    "Enviando escudo do time visitante:",
                    logoVisitante.name
                );


                escudoVisitante =
                    await uploadTeamLogo(
                        logoVisitante
                    );


                console.log(
                    "URL escudo visitante:",
                    escudoVisitante
                );

            }


            // --------------------------------------
            // DADOS FINAIS
            // --------------------------------------

            const gameData = {

                time_casa:
                    game.time_casa,

                time_visitante:
                    game.time_visitante,

                escudo_time_casa:
                    escudoCasa,

                escudo_time_visitante:
                    escudoVisitante,

                local:
                    game.local,

                data:
                    game.data,

                horario:
                    game.horario

            };


            // ======================================
            // EDITAR
            // ======================================

            if (editingGame) {

                const updatedGame =
                    await updateGame(
                        editingGame.id,
                        gameData
                    );


                console.log(
                    "Jogo atualizado:",
                    updatedGame
                );


                alert(
                    "Jogo atualizado com sucesso!"
                );

            }


            // ======================================
            // CADASTRAR
            // ======================================

            else {

                const newGame =
                    await createGame(
                        gameData
                    );


                console.log(
                    "Jogo criado:",
                    newGame
                );


                alert(
                    "Jogo cadastrado com sucesso!"
                );

            }


            // ======================================
            // ATUALIZAR LISTA
            // ======================================

            await loadGames();


            setEditingGame(null);

            resetForm();


        } catch (error) {

            console.error(
                "Erro completo:",
                error
            );


            alert(
                error?.message ||
                "Erro ao salvar jogo."
            );

        } finally {

            setLoading(false);

        }

    }


    // ==========================================
    // EDITAR JOGO
    // ==========================================

    function handleEdit(gameData) {

        setEditingGame(gameData);


        setGame({

            time_casa:
                gameData.time_casa || "",

            time_visitante:
                gameData.time_visitante || "",

            escudo_time_casa:
                gameData.escudo_time_casa || "",

            escudo_time_visitante:
                gameData.escudo_time_visitante || "",

            local:
                gameData.local || "",

            data:
                gameData.data || "",

            horario:
                gameData.horario
                    ? gameData.horario.substring(0, 5)
                    : ""

        });


        setLogoCasa(null);

        setLogoVisitante(null);


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    // ==========================================
    // CANCELAR EDIÇÃO
    // ==========================================

    function handleCancelEdit() {

        setEditingGame(null);

        resetForm();

    }


    // ==========================================
    // EXCLUIR JOGO
    // ==========================================

    async function handleDelete(gameData) {

        const confirmation =
            window.confirm(
                `Tem certeza que deseja excluir o jogo "${gameData.time_casa} x ${gameData.time_visitante}"?`
            );


        if (!confirmation) {

            return;

        }


        try {

            setLoading(true);


            // --------------------------------------
            // VERIFICAR ADMIN
            // --------------------------------------

            await checkAdmin();


            // --------------------------------------
            // EXCLUIR DO BANCO
            // --------------------------------------

            await deleteGame(
                gameData.id
            );


            // --------------------------------------
            // ATUALIZAR LISTA
            // --------------------------------------

            await loadGames();


            // --------------------------------------
            // CANCELAR EDIÇÃO
            // --------------------------------------

            if (
                editingGame &&
                editingGame.id === gameData.id
            ) {

                setEditingGame(null);

                resetForm();

            }


            alert(
                "Jogo excluído com sucesso!"
            );


        } catch (error) {

            console.error(
                "Erro ao excluir jogo:",
                error
            );


            alert(
                error?.message ||
                "Erro ao excluir jogo."
            );

        } finally {

            setLoading(false);

        }

    }


    // ==========================================
    // FORMATAR DATA
    // ==========================================

    function formatDate(date) {

        if (!date) {

            return "";

        }


        const parts =
            date.split("-");


        if (parts.length !== 3) {

            return date;

        }


        return (
            parts[2] +
            "/" +
            parts[1] +
            "/" +
            parts[0]
        );

    }


    // ==========================================
    // FORMATAR HORÁRIO
    // ==========================================

    function formatTime(time) {

        if (!time) {

            return "";

        }


        return time.substring(0, 5);

    }


    // ==========================================
    // INTERFACE
    // ==========================================

    return (

        <div className="games-manager">

            <h1>
                Gerenciamento de Jogos
            </h1>


            {/* ======================================
                FORMULÁRIO
            ====================================== */}

            <form
                className="game-form"
                onSubmit={handleSubmit}
            >

                <h2>
                    {editingGame
                        ? "Editar Jogo"
                        : "Novo Jogo"}
                </h2>


                {/* ==============================
                    TIME DA CASA
                ============================== */}

                <input
                    type="text"
                    name="time_casa"
                    placeholder="Time da casa"
                    value={game.time_casa}
                    onChange={handleChange}
                />


                <label>
                    Escudo do time da casa
                </label>


                <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoCasa}
                />


                {editingGame &&
                game.escudo_time_casa && (

                    <div>

                        <p>
                            Escudo atual:
                        </p>

                        <img
                            src={
                                game.escudo_time_casa
                            }
                            alt={
                                game.time_casa
                            }
                            width="100"
                        />

                    </div>

                )}


                {/* ==============================
                    TIME VISITANTE
                ============================== */}

                <input
                    type="text"
                    name="time_visitante"
                    placeholder="Time visitante"
                    value={
                        game.time_visitante
                    }
                    onChange={handleChange}
                />


                <label>
                    Escudo do time visitante
                </label>


                <input
                    type="file"
                    accept="image/*"
                    onChange={
                        handleLogoVisitante
                    }
                />


                {editingGame &&
                game.escudo_time_visitante && (

                    <div>

                        <p>
                            Escudo atual:
                        </p>

                        <img
                            src={
                                game.escudo_time_visitante
                            }
                            alt={
                                game.time_visitante
                            }
                            width="100"
                        />

                    </div>

                )}


                {/* ==============================
                    LOCAL
                ============================== */}

                <input
                    type="text"
                    name="local"
                    placeholder="Local"
                    value={game.local}
                    onChange={handleChange}
                />


                {/* ==============================
                    DATA
                ============================== */}

                <input
                    type="date"
                    name="data"
                    value={game.data}
                    onChange={handleChange}
                />


                {/* ==============================
                    HORÁRIO
                ============================== */}

                <input
                    type="time"
                    name="horario"
                    value={game.horario}
                    onChange={handleChange}
                />


                {/* ==============================
                    BOTÕES
                ============================== */}

                <button
                    type="submit"
                    disabled={loading}
                >

                    {loading
                        ? "Processando..."
                        : editingGame
                            ? "Salvar alterações"
                            : "Cadastrar jogo"}

                </button>


                {editingGame && (

                    <button
                        type="button"
                        onClick={
                            handleCancelEdit
                        }
                        disabled={loading}
                    >
                        Cancelar edição
                    </button>

                )}

            </form>


            <hr />


            {/* ======================================
                LISTA
            ====================================== */}

            <h2>
                Jogos cadastrados
            </h2>


            {games.length === 0 && (

                <p>
                    Nenhum jogo cadastrado.
                </p>

            )}


            {games.length > 0 && (

                <div className="games-list">

                    {games.map((gameData) => (

                        <div
                            key={gameData.id}
                            className="game-card-admin"
                        >

                            <div
                                className="game-teams-admin"
                            >

                                {/* ======================
                                    CASA
                                ====================== */}

                                <div>

                                    {gameData.escudo_time_casa && (

                                        <img
                                            src={
                                                gameData.escudo_time_casa
                                            }
                                            alt={
                                                gameData.time_casa
                                            }
                                            width="80"
                                        />

                                    )}


                                    <h3>
                                        {gameData.time_casa}
                                    </h3>

                                </div>


                                <strong>
                                    ×
                                </strong>


                                {/* ======================
                                    VISITANTE
                                ====================== */}

                                <div>

                                    {gameData.escudo_time_visitante && (

                                        <img
                                            src={
                                                gameData.escudo_time_visitante
                                            }
                                            alt={
                                                gameData.time_visitante
                                            }
                                            width="80"
                                        />

                                    )}


                                    <h3>
                                        {gameData.time_visitante}
                                    </h3>

                                </div>

                            </div>


                            <p>
                                Local: {
                                    gameData.local
                                }
                            </p>


                            <p>
                                Data: {
                                    formatDate(
                                        gameData.data
                                    )
                                }
                            </p>


                            <p>
                                Horário: {
                                    formatTime(
                                        gameData.horario
                                    )
                                }
                            </p>


                            <div
                                className="game-actions"
                            >

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleEdit(
                                            gameData
                                        )
                                    }
                                    disabled={loading}
                                >
                                    Editar
                                </button>


                                <button
                                    type="button"
                                    onClick={() =>
                                        handleDelete(
                                            gameData
                                        )
                                    }
                                    disabled={loading}
                                >
                                    Excluir
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}


export default GamesManager;