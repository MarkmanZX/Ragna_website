import "../pages/Register.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

function Register() {
    const navigate = useNavigate();

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            alert("As senhas não coincidem!");
            return;
        }

        const {error} = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name
                }
            }
        });

        if(error) {
            alert(error.message);
            return;
        }

        alert("Conta criada com sucesso!");
        navigate("/login");
};

return (
    <div className="register-container">
        <div className="register-card">
            <h1> Criar Conta</h1>
            <p>Cadastre-se para acessar o Ragna FC</p>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirmar Senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button className="register-btn" type="submit">Criar Conta</button>
            </form>

            <Link className="register-link" to="/login">
                Já possui uma conta? Entrar
            </Link>
        </div>
    </div>
);
}

export default Register;