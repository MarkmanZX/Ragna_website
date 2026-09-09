import { supabase } from "./supabase";

export async function getGallery() {
    const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        throw error;
    }

    return data;
}

export async function createGalleryImage(imageUrl) {
    const { data, error } = await supabase
        .from("gallery")
        .insert([
            {
                imagem: imageUrl
            }
        ])
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
}

export async function deleteGalleryImage(id) {
    const { error } = await supabase
        .from("gallery")
        .delete()
        .eq("id", id);

    if (error) {
        throw error;
    }
}