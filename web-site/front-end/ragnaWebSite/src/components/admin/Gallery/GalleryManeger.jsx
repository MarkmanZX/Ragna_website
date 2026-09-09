import { useState, useEffect } from "react";

import { supabase } from "../../../services/supabase";

import {
    getGallery,
    createGalleryImage,
    deleteGalleryImage
} from "../../../services/GalleryService";

import {
    uploadGalleryImage,
    deleteGalleryImage as deleteGalleryStorageImage
} from "../../../services/StorageService";

function GalleryManager() {

    const [images, setImages] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadGallery();
    }, []);

    async function loadGallery() {
        try {
            const data = await getGallery();

            setImages(data || []);
        } catch (error) {
            console.error(
                "Erro ao carregar galeria:",
                error
            );
        }
    }

    async function checkAdmin() {

        const { data, error } = await supabase.rpc("is_admin");

        console.log("IS ADMIN:", data);
        console.log("ADMIN ERROR:", error);

        if (error) {
            throw error;
        }

        if (!data) {
            throw new Error(
                "Você não possui permissão de administrador."
            );
        }
    }

    function handleFilesChange(event) {

        const files = Array.from(
            event.target.files || []
        );

        setSelectedFiles(files);
    }

    async function handleUpload() {

        if (selectedFiles.length === 0) {
            alert("Selecione pelo menos uma imagem.");
            return;
        }

        try {

            setLoading(true);

            await checkAdmin();

            for (const file of selectedFiles) {

                const imageUrl =
                    await uploadGalleryImage(file);

                await createGalleryImage(imageUrl);
            }

            setSelectedFiles([]);

            const fileInput =
                document.getElementById("gallery-file");

            if (fileInput) {
                fileInput.value = "";
            }

            await loadGallery();

            alert(
                "Imagem(ns) adicionada(s) com sucesso."
            );

        } catch (error) {

            console.error(
                "Erro ao adicionar imagem:",
                error
            );

            alert(
                error.message ||
                "Erro ao adicionar imagem."
            );

        } finally {

            setLoading(false);

        }
    }

    async function handleDelete(image) {

        const confirmed = window.confirm(
            "Tem certeza que deseja excluir esta imagem?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setLoading(true);

            await checkAdmin();

            // Exclui o registro do banco
            await deleteGalleryImage(image.id);

            // Tenta excluir o arquivo do Storage
            try {

                await deleteGalleryStorageImage(
                    image.imagem
                );

            } catch (storageError) {

                console.error(
                    "Erro ao excluir imagem do Storage:",
                    storageError
                );

            }

            await loadGallery();

            alert(
                "Imagem excluída com sucesso."
            );

        } catch (error) {

            console.error(
                "Erro ao excluir imagem:",
                error
            );

            alert(
                error.message ||
                "Erro ao excluir imagem."
            );

        } finally {

            setLoading(false);

        }
    }

    return (

        <div className="gallery-manager">

            <h1>Galeria</h1>

            <div className="gallery-upload">

                <h2>Adicionar imagens</h2>

                <input
                    id="gallery-file"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFilesChange}
                />

                {selectedFiles.length > 0 && (
                    <p>
                        {selectedFiles.length} imagem(ns)
                        selecionada(s)
                    </p>
                )}

                <button
                    type="button"
                    onClick={handleUpload}
                    disabled={loading}
                >
                    {loading
                        ? "Enviando..."
                        : "Adicionar imagens"}
                </button>

            </div>

            <div className="gallery-admin-list">

                {images.length === 0 ? (

                    <p>
                        Nenhuma imagem cadastrada.
                    </p>

                ) : (

                    images.map((image) => (

                        <div
                            key={image.id}
                            className="gallery-admin-item"
                        >

                            <img
                                src={image.imagem}
                                alt="Imagem da galeria"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    handleDelete(image)
                                }
                                disabled={loading}
                            >
                                Excluir
                            </button>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
}

export default GalleryManager;