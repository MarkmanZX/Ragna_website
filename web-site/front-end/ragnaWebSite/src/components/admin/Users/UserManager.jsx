import { useEffect, useState } from "react";
import { getUsers, updateUserRole } from "../../../services/usersService";
import "./Users.css";

function UsersManager() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadUsers();
    }, []);

    async function loadUsers() {
        try {
            setLoading(true);

            const data = await getUsers();

            setUsers(data || []);
        } catch (error) {
            console.error("Erro ao carregar usuários:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleRoleChange(user, newRole) {
        if (user.role === newRole) return;

        const confirmed = window.confirm(
            `Alterar a função de "${user.name}" para "${newRole === "admin" ? "Administrador" : "Usuário"}"?`
        );

        if (!confirmed) return;

        try {
            setSaving(true);

            const updatedUser = await updateUserRole(
                user.id,
                newRole
            );

            setUsers((currentUsers) =>
                currentUsers.map((item) =>
                    item.id === user.id
                        ? updatedUser
                        : item
                )
            );

            alert("Função atualizada com sucesso.");
        } catch (error) {
            console.error(
                "Erro ao atualizar função:",
                error
            );

            alert(
                error.message ||
                "Erro ao atualizar função."
            );
        } finally {
            setSaving(false);
        }
    }

    function formatDate(date) {
        if (!date) return "-";

        return new Date(date).toLocaleDateString("pt-BR");
    }

    return (
        <div className="users-manager">

            <h1>Usuários</h1>

            {loading ? (
                <p>Carregando usuários...</p>
            ) : users.length === 0 ? (
                <p>Nenhum usuário cadastrado.</p>
            ) : (
                <div className="users-list">

                    {users.map((user) => (
                        <div
                            className="user-card"
                            key={user.id}
                        >
                            <h2>
                                {user.name || "Sem nome"}
                            </h2>

                            <p>
                                <strong>E-mail:</strong>{" "}
                                {user.email || "-"}
                            </p>

                            <p>
                                <strong>Cadastro:</strong>{" "}
                                {formatDate(user.created_at)}
                            </p>

                            <div className="user-role">
                                <strong>Função:</strong>

                                <select
                                    value={user.role || "user"}
                                    onChange={(event) =>
                                        handleRoleChange(
                                            user,
                                            event.target.value
                                        )
                                    }
                                    disabled={saving}
                                >
                                    <option value="user">
                                        Usuário
                                    </option>

                                    <option value="admin">
                                        Administrador
                                    </option>
                                </select>
                            </div>
                        </div>
                    ))}

                </div>
            )}

        </div>
    );
}

export default UsersManager;