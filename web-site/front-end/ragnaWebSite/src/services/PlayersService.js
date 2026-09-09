import { supabase } from "./supabase";

export async function getPlayers() {

    const { data, error } = await supabase
        .from("players")
        .select("*")
        .order("name");

    if (error) {
        throw error;
    }

    return data;
}


export async function createPlayer(player) {

    const { data, error } = await supabase
        .from("players")
        .insert([player])
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
}


export async function updatePlayer(id, player) {

    const { data, error } = await supabase
        .from("players")
        .update(player)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
}


export async function deletePlayer(id) {

    const { error } = await supabase
        .from("players")
        .delete()
        .eq("id", id);

    if (error) {
        throw error;
    }

}