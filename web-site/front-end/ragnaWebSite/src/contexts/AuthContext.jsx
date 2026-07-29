import { createContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadUser() {

            const { data } = await supabase.auth.getSession();

            setUser(data.session?.user ?? null);

            setLoading(false);

        }

        loadUser();

        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange((event, session) => {

            setUser(session?.user ?? null);

        });

        return () => subscription.unsubscribe();

    }, []);

    async function logout() {

        await supabase.auth.signOut();

    }

    return (

        <AuthContext.Provider
            value={{
                user,
                loading,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}