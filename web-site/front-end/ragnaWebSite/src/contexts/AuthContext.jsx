import { createContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    async function loadProfile(userId) {
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .single();

        if (error) {
            console.error("Erro ao carregar perfil:", error.message);
            setProfile(null);
            return;
        }

        setProfile(data);
    }

    useEffect(() => {

        async function loadUser() {

            const {
                data: { session }
            } = await supabase.auth.getSession();

            const currentUser = session?.user ?? null;

            setUser(currentUser);

            if (currentUser) {
                await loadProfile(currentUser.id);
            }

            setLoading(false);
        }

        loadUser();

        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange(async (event, session) => {

            const currentUser = session?.user ?? null;

            setUser(currentUser);

            if (currentUser) {
                await loadProfile(currentUser.id);
            } else {
                setProfile(null);
            }

        });

        return () => subscription.unsubscribe();

    }, []);

    async function logout() {
        await supabase.auth.signOut();

        setUser(null);
        setProfile(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                profile,
                role: profile?.role ?? "user",
                loading,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}