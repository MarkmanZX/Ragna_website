import logoRagna from "../assets/images/logoRagna.png";

import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {
    
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [lembrar, setLembrar] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password: password,
        });

        if (error){
            alert("Email ou senha inválidos.");
            return;
        }

        console.log(data.user);
        navigate("/");

    };
    return (
        <div className="login-container">
            <div className="login-card">
                <img src={logoRagna}
                    className="login-logo" />
                    <h1>Bem-vindo ao Ragna FC</h1>
                    <p>Faça login para continuar</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="E-mail"
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
                        <div className="remember">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={lembrar}
                                    onChange={(e) => setLembrar(!lembrar)}
                                />
                                Lembrar de mim
                            </label>
                        </div>
                        <button className="login-btn" type="submit">
                            Entrar
                        </button>
                    </form>
                    <div className="divider">
                        <span>ou</span>
                    </div>
                    <p className="register-text">
                        Ainda não possui uma conta?
                    </p>
                    <Link className="register-btn" to="/register">
                        Criar conta
                    </Link>
            </div>
        </div>
    );
}

export default Login;