import { useState } from "react";
import Sidebar from "../components/admin/sidebar";
import Dashboard from "../components/admin/Dashboard";
import PlayerManager from "../components/admin/Players/PlayersManager";
import GamesManager from "../components/admin/Games/GameManeger";
import GalleryManager from "../components/admin/Gallery/GalleryManeger";
import UsersManager from "../components/admin/Users/UserManager";
import "../styles/Admin.css";

function Admin() {
    const [section, setSection] = useState("dashboard");

    return (
        <div className="admin-container">
            <Sidebar
                section={section}
                setSection={setSection}
            />

            <div className="admin-content">
                {section === "dashboard" && <Dashboard />}

                {section === "players" && <PlayerManager />}

                {section === "games" && <GamesManager />}

                {section === "gallery" && <GalleryManager />}

                {section === "users" && <UsersManager />}
            </div>
        </div>
    );
}

export default Admin;