function Sidebar ({section, setSection}){
    return(
        <div className="admin-sidebar">
            <h2>Ragna FC</h2>
            <button 
                onClick={() => setSection ("dashboard")}
                className={section === "dashboard" ? "active" : ""}
        >
            Dashboard
        </button>
        <button
            onClick={() => setSection ("players")}
            className={section === "players" ? "active" : ""}
        >
            Jogadores
        </button>
        <button
            onClick={() => setSection ("games")}
            className={section === "games" ? "active" : ""}
        >
            Jogos
        </button>
        <button
            onClick={() => setSection ("gallery")}
            className={section === "gallery" ? "active" : ""}
        >
            Galeria
        </button>
        <button
            onClick={() => setSection ("users")}
            className={section === "users" ? "active" : ""}
        >
            Usuários
        </button>
        </div>
    );
}

export default Sidebar;