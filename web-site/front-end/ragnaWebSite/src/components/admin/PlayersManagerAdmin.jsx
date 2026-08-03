import { useState } from "react";

function PlayersManagerAdmin() {

    const [form, setForm] = useState({
        name: "",
        birthdate: "",
        position: "",
        dominant_foot: "",
        photo_url: ""
    });

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        console.log(form);
    }

    return (
        <div>
            <h1>Jogadores</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Nome"
                    value={form.name}
                    onChange={handleChange}
                />

                <input
                    type="date"
                    name="birth_date"
                    value={form.birth_date}
                    onChange={handleChange}
                />

                <select
                    name="position"
                    value={form.position}
                    onChange={handleChange}
                >
                    <option value="">Posição</option>
                    <option value="Goleiro">Goleiro</option>
                    <option value="Fixo">Fixo</option>
                    <option value="Ala">Ala</option>
                    <option value="Pivô">Pivô</option>
                    <option value="Zagueiro">Zagueiro</option>
                    <option value="Lateral">Lateral</option>
                    <option value="MeioCampo">Meio Campo</option>
                    <option value="Volante">Volante</option>
                    <option value="Centroavante">Centroavante</option>
                    <option value="Ponta">Ponta</option>
                </select>

                <select
                    name="dominant_foot"
                    value={form.dominant_foot}
                    onChange={handleChange}
                >
                    <option value="">Pé Dominante</option>
                    <option value="Direito">Direito</option>
                    <option value="Esquerdo">Esquerdo</option>
                    <option value="Ambidestro">Ambidestro</option>
                </select>

                <button type="submit">
                    Cadastrar Jogador
                </button>
            </form>
        </div>
    );
}

export default PlayersManagerAdmin;