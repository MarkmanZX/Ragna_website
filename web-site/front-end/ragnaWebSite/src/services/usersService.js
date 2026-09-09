import { supabase } from "./supabase";

export async function getUsers() {
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
}

export async function updateUserRole(id, role) {
    const { data, error } = await supabase
        .from("profiles")
        .update({ role })
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    return data;
}