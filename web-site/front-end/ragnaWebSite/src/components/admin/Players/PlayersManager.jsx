import { useState, useEffect } from "react";

import PlayerForm from "./PlayerForm";

import { supabase } from "../../../services/supabase";

import {
    createPlayer,
    getPlayers,
    updatePlayer,
    deletePlayer
} from "../../../services/playersService";

import { uploadPlayerPhoto } from "../../../services/storageService";


function PlayersManager() {

    const [players, setPlayers] = useState([]);

    const [loading, setLoading] = useState(false);

    const [editingPlayer, setEditingPlayer] = useState(null);


    // ==================================================
    // CARREGAR JOGADORES
    // ==================================================

    useEffect(() => {

        loadPlayers();

    }, []);


    async function loadPlayers() {

        try {

            const data = await getPlayers();

            setPlayers(data || []);

        } catch (error) {

            console.error(
                "Erro ao carregar jogadores:",
                error
            );

        }

    }


    // ==================================================
    // VERIFICAR ADMINISTRADOR
    // ==================================================

    async function checkAdmin() {

        const {
            data: adminCheck,
            error: adminError
        } = await supabase.rpc("is_admin");


        console.log(
            "IS ADMIN:",
            adminCheck
        );

        console.log(
            "ADMIN ERROR:",
            adminError
        );


        if (adminError) {

            console.error(
                "Erro ao verificar administrador:",
                adminError
            );

            throw new Error(
                "Erro ao verificar permissão de administrador."
            );

        }


        if (!adminCheck) {

            throw new Error(
                "Você não possui permissão de administrador."
            );

        }


        return true;

    }


    // ==================================================
    // CADASTRAR / EDITAR JOGADOR
    // ==================================================

    async function handlePlayerSubmit(player) {

        try {

            setLoading(true);


            // Verifica se é administrador
            await checkAdmin();


            // ==========================================
            // FOTO
            // ==========================================

            let photoUrl = "";


            /*
             * Durante a edição:
             *
             * Se photo_url for uma string,
             * significa que nenhuma foto nova
             * foi selecionada.
             *
             * Nesse caso mantemos a foto atual.
             */

            if (
                editingPlayer &&
                typeof player.photo_url === "string"
            ) {

                photoUrl = player.photo_url;

            }


            /*
             * Se photo_url não for string,
             * significa que o usuário selecionou
             * um novo arquivo.
             */

            if (
                player.photo_url &&
                typeof player.photo_url !== "string"
            ) {

                console.log(
                    "Enviando foto:",
                    player.photo_url.name
                );


                photoUrl = await uploadPlayerPhoto(
                    player.photo_url
                );


                console.log(
                    "URL da foto:",
                    photoUrl
                );

            }


            // ==========================================
            // EDITAR
            // ==========================================

            if (editingPlayer) {

                const updatedPlayer = await updatePlayer(
                    editingPlayer.id,
                    {
                        name: player.name,
                        birth_date: player.birth_date,
                        position: player.position,
                        dominant_foot: player.dominant_foot,
                        photo_url: photoUrl
                    }
                );


                console.log(
                    "Jogador atualizado:",
                    updatedPlayer
                );


                alert(
                    "Jogador atualizado com sucesso!"
                );


                setEditingPlayer(null);

            }


            // ==========================================
            // CADASTRAR
            // ==========================================

            else {

                const newPlayer = await createPlayer({

                    name: player.name,

                    birth_date: player.birth_date,

                    position: player.position,

                    dominant_foot: player.dominant_foot,

                    photo_url: photoUrl

                });


                console.log(
                    "Jogador criado:",
                    newPlayer
                );


                alert(
                    "Jogador cadastrado com sucesso!"
                );

            }


            // Atualiza a lista
            await loadPlayers();


        } catch (error) {

            console.error(
                "Erro completo:",
                error
            );


            alert(
                error?.message ||
                "Erro ao salvar jogador."
            );


        } finally {

            setLoading(false);

        }

    }


    // ==================================================
    // EDITAR
    // ==================================================

    function handleEdit(player) {

        setEditingPlayer(player);


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    // ==================================================
    // CANCELAR EDIÇÃO
    // ==================================================

    function handleCancelEdit() {

        setEditingPlayer(null);

    }


    // ==================================================
    // EXCLUIR JOGADOR
    // ==================================================

    async function handleDelete(player) {

        const confirmation = window.confirm(
            `Tem certeza que deseja excluir o jogador "${player.name}"?`
        );


        if (!confirmation) {

            return;

        }


        try {

            setLoading(true);


            // Verifica administrador
            await checkAdmin();


            // ==========================================
            // EXCLUI O JOGADOR DO BANCO
            // ==========================================

            await deletePlayer(
                player.id
            );


            // ==========================================
            // REMOVE A FOTO DO STORAGE
            // ==========================================

            if (player.photo_url) {

                try {

                    /*
                     * Extrai o nome do arquivo a partir
                     * da URL pública do Supabase.
                     */

                    const photoUrl = player.photo_url;

                    const marker =
                        "/storage/v1/object/public/players/";

                    const markerIndex =
                        photoUrl.indexOf(marker);


                    if (markerIndex !== -1) {

                        const filePath =
                            decodeURIComponent(
                                photoUrl.substring(
                                    markerIndex + marker.length
                                )
                            );


                        console.log(
                            "Removendo foto:",
                            filePath
                        );


                        const {
                            error: storageError
                        } = await supabase.storage
                            .from("players")
                            .remove([
                                filePath
                            ]);


                        if (storageError) {

                            console.error(
                                "Erro ao remover foto do Storage:",
                                storageError
                            );

                        }

                    }

                } catch (storageError) {

                    console.error(
                        "Erro ao processar remoção da foto:",
                        storageError
                    );

                }

            }


            // ==========================================
            // ATUALIZA A LISTA
            // ==========================================

            await loadPlayers();


            // Se estava editando esse jogador,
            // cancela o modo de edição.

            if (
                editingPlayer &&
                editingPlayer.id === player.id
            ) {

                setEditingPlayer(null);

            }


            alert(
                "Jogador excluído com sucesso!"
            );


        } catch (error) {

            console.error(
                "Erro ao excluir jogador:",
                error
            );


            alert(
                error?.message ||
                "Erro ao excluir jogador."
            );


        } finally {

            setLoading(false);

        }

    }


    // ==================================================
    // INTERFACE
    // ==================================================

    return (

        <div className="players-manager">


            <h1>
                Gerenciamento de Jogadores
            </h1>


            <PlayerForm
                onSubmit={handlePlayerSubmit}
                editingPlayer={editingPlayer}
                onCancelEdit={handleCancelEdit}
            />


            <hr />


            <h2>
                Jogadores cadastrados
            </h2>


            {loading && (

                <p>
                    Processando...
                </p>

            )}


            {players.length === 0 ? (

                <p>
                    Nenhum jogador cadastrado.
                </p>

            ) : (

                <div className="players-list">

                    {players.map((player) => (

                        <div
                            key={player.id}
                            className="player-card"
                        >


                            {player.photo_url ? (

                                <img
                                    src={player.photo_url}
                                    alt={player.name}
                                    width="120"
                                />

                            ) : (

                                <p>
                                    Foto não cadastrada.
                                </p>

                            )}


                            <h3>
                                {player.name}
                            </h3>


                            <p>
                                Posição: {player.position}
                            </p>


                            <p>
                                Data de nascimento: {player.birth_date}
                            </p>


                            <p>
                                Pé dominante: {player.dominant_foot}
                            </p>


                            <div className="player-actions">


                                <button
                                    type="button"
                                    onClick={() =>
                                        handleEdit(player)
                                    }
                                    disabled={loading}
                                >
                                    Editar
                                </button>


                                <button
                                    type="button"
                                    onClick={() =>
                                        handleDelete(player)
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


export default PlayersManager;