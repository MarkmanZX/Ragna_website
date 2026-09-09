import { supabase } from "./supabase";


// ==========================================
// UPLOAD DA FOTO DO JOGADOR
// ==========================================

export async function uploadPlayerPhoto(file) {

    if (!file) {
        return "";
    }

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
        .from("players")
        .upload(fileName, file);

    if (error) {
        throw error;
    }

    const { data } = supabase.storage
        .from("players")
        .getPublicUrl(fileName);

    return data.publicUrl;
}


// ==========================================
// UPLOAD DO ESCUDO DO TIME
// ==========================================

export async function uploadTeamLogo(file) {

    if (!file) {
        return "";
    }

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
        .from("teams")
        .upload(fileName, file);

    if (error) {
        throw error;
    }

    const { data } = supabase.storage
        .from("teams")
        .getPublicUrl(fileName);

    return data.publicUrl;
}


// ==========================================
// EXCLUIR ESCUDO DO TIME
// ==========================================

export async function deleteTeamLogo(photoUrl) {

    if (!photoUrl) {
        return;
    }

    const marker =
        "/storage/v1/object/public/teams/";

    const markerIndex =
        photoUrl.indexOf(marker);

    if (markerIndex === -1) {
        return;
    }

    const filePath =
        decodeURIComponent(
            photoUrl.substring(
                markerIndex + marker.length
            )
        );

    const { error } = await supabase.storage
        .from("teams")
        .remove([
            filePath
        ]);

    if (error) {
        throw error;
    }
}


// ==========================================
// UPLOAD DA IMAGEM DA GALERIA
// ==========================================

export async function uploadGalleryImage(file) {

    if (!file) {
        return "";
    }

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
        .from("gallery")
        .upload(fileName, file);

    if (error) {
        throw error;
    }

    const { data } = supabase.storage
        .from("gallery")
        .getPublicUrl(fileName);

    return data.publicUrl;
}


// ==========================================
// EXCLUIR IMAGEM DA GALERIA
// ==========================================

export async function deleteGalleryImage(imageUrl) {

    if (!imageUrl) {
        return;
    }

    const marker =
        "/storage/v1/object/public/gallery/";

    const markerIndex =
        imageUrl.indexOf(marker);

    if (markerIndex === -1) {
        return;
    }

    const filePath =
        decodeURIComponent(
            imageUrl.substring(
                markerIndex + marker.length
            )
        );

    const { error } = await supabase.storage
        .from("gallery")
        .remove([
            filePath
        ]);

    if (error) {
        throw error;
    }
}