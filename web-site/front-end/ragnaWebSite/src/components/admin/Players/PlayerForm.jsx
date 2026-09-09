import { useEffect, useState } from "react";


function PlayerForm({
    onSubmit,
    editingPlayer,
    onCancelEdit
}) {

    const [player, setPlayer] = useState({
        name: "",
        birth_date: "",
        position: "",
        dominant_foot: "",
        photo_url: null
    });


    // Preenche o formulário quando um jogador é selecionado para edição
    useEffect(() => {

        if (editingPlayer) {

            setPlayer({
                name: editingPlayer.name || "",
                birth_date: editingPlayer.birth_date || "",
                position: editingPlayer.position || "",
                dominant_foot: editingPlayer.dominant_foot || "",
                photo_url: editingPlayer.photo_url || null
            });

        } else {

            setPlayer({
                name: "",
                birth_date: "",
                position: "",
                dominant_foot: "",
                photo_url: null
            });

        }

    }, [editingPlayer]);


    function handleChange(e) {

        setPlayer((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

    }


    function handlePhoto(e) {

        const file = e.target.files[0];

        if (!file) {
            return;
        }

        setPlayer((prev) => ({
            ...prev,
            photo_url: file
        }));

    }


    async function handleClick() {

        if (
            !player.name ||
            !player.birth_date ||
            !player.position ||
            !player.dominant_foot
        ) {

            alert("Preencha todos os campos.");

            return;

        }


        console.log("PLAYER FORM");
        console.log(player);


        try {

            await onSubmit(player);

        } catch (error) {

            console.error(
                "Erro no formulário:",
                error
            );

        }

    }


    return (

        <div className="player-form">


            <h2>
                {editingPlayer
                    ? "Editar Jogador"
                    : "Novo Jogador"
                }
            </h2>


            <input
                type="text"
                name="name"
                placeholder="Nome"
                value={player.name}
                onChange={handleChange}
            />


            <input
                type="date"
                name="birth_date"
                value={player.birth_date}
                onChange={handleChange}
            />


            <select
                name="position"
                value={player.position}
                onChange={handleChange}
            >

                <option value="">
                    Selecione a posição
                </option>

                <option value="Goleiro">
                    Goleiro
                </option>

                <option value="Fixo">
                    Fixo
                </option>

                <option value="Ala">
                    Ala
                </option>

                <option value="Pivo">
                    Pivô
                </option>

                <option value="Zagueiro">
                    Zagueiro
                </option>

                <option value="Lateral">
                    Lateral
                </option>

                <option value="Volante">
                    Volante
                </option>

                <option value="Meio-Campo">
                    Meio-Campo
                </option>

                <option value="Ponta">
                    Ponta
                </option>

                <option value="Centroavante">
                    Centroavante
                </option>

            </select>


            <select
                name="dominant_foot"
                value={player.dominant_foot}
                onChange={handleChange}
            >

                <option value="">
                    Pé dominante
                </option>

                <option value="Destro">
                    Destro
                </option>

                <option value="Canhoto">
                    Canhoto
                </option>

                <option value="Ambidestro">
                    Ambidestro
                </option>

            </select>


            {editingPlayer && player.photo_url && (
                <div className="current-player-photo">

                    <p>
                        Foto atual:
                    </p>

                    <img
                        src={
                            typeof player.photo_url === "string"
                                ? player.photo_url
                                : URL.createObjectURL(player.photo_url)
                        }
                        alt="Foto atual do jogador"
                        width="120"
                    />

                </div>
            )}


            <input
                type="file"
                accept="image/*"
                onChange={handlePhoto}
            />


            {editingPlayer && (

                <p>
                    Selecione uma nova foto apenas se quiser
                    substituir a atual.
                </p>

            )}


            <button
                type="button"
                onClick={handleClick}
            >

                {editingPlayer
                    ? "Salvar Alterações"
                    : "Cadastrar Jogador"
                }

            </button>


            {editingPlayer && (

                <button
                    type="button"
                    onClick={onCancelEdit}
                >
                    Cancelar
                </button>

            )}


        </div>

    );

}


export default PlayerForm;