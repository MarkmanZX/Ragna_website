import { supabase } from "./supabase";


// ==========================================
// BUSCAR JOGOS
// ==========================================

export async function getGames() {

    const { data, error } = await supabase
        .from("games")
        .select("*")
        .order("data", { ascending: true })
        .order("horario", { ascending: true });


    if (error) {

        throw error;

    }


    return data;

}


// ==========================================
// CRIAR JOGO
// ==========================================

export async function createGame(game) {

    const { data, error } = await supabase
        .from("games")
        .insert([game])
        .select()
        .single();


    if (error) {

        throw error;

    }


    return data;

}


// ==========================================
// ATUALIZAR JOGO
// ==========================================

export async function updateGame(id, game) {

    const { data, error } = await supabase
        .from("games")
        .update(game)
        .eq("id", id)
        .select()
        .single();


    if (error) {

        throw error;

    }


    return data;

}


// ==========================================
// EXCLUIR JOGO
// ==========================================

export async function deleteGame(id) {

    const { error } = await supabase
        .from("games")
        .delete()
        .eq("id", id);


    if (error) {

        throw error;

    }

}