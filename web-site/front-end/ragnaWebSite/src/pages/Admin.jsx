import{ useState } from 'react';
import Sidebar from '../components/admin/Sidebar';
import Dashboard from '../components/admin/Dashboard';
import "../styles/Admin.css";

function Admin(){
    const [section, setSection] = useState("dashboard");

    return(
        <div className="admin-container">
            <Sidebar 
                section={section}
                setSection={setSection}
            />
            <div className="admin-content">
                {section === "dashboard" && <Dashboard />}     
            </div> 
        </div>
    );
}

export default Admin;