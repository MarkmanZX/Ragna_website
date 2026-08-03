import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function ProtectedRoute({ children, adminOnly = false }) {
    const { user, role, loading } = useAuth();

    if (loading) {
        return <h2>Carregando...</h2>
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;