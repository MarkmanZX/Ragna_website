import { useState, useEffect } from "react";

import "../pages/Gallery.css";

import { getGallery } from "../services/GalleryService";

function Gallery() {

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        async function loadGallery() {

            try {

                setLoading(true);
                setError(null);

                const data = await getGallery();

                setImages(data || []);

            } catch (err) {

                console.error(
                    "Erro ao carregar galeria:",
                    err
                );

                setError(
                    "Não foi possível carregar a galeria."
                );

            } finally {

                setLoading(false);

            }
        }

        loadGallery();

    }, []);

    return (

        <div className="galleryFull">

            <div className="top">

                <button
                    className="back-button"
                    onClick={() => {
                        window.location.href = "/";
                    }}
                >
                    ◀
                </button>

                <h1>
                    Galeria
                </h1>

            </div>

            <div className="containerGallery">

                <div className="galleryItem">

                    {loading && (
                        <p>
                            Carregando imagens...
                        </p>
                    )}

                    {!loading && error && (
                        <p>
                            {error}
                        </p>
                    )}

                    {!loading &&
                        !error &&
                        images.length === 0 && (
                            <p>
                                Nenhuma imagem cadastrada.
                            </p>
                        )}

                    {!loading &&
                        !error &&
                        images.length > 0 &&
                        images.map((image) => (

                            <img
                                key={image.id}
                                src={image.imagem}
                                alt="Imagem da galeria"
                            />

                        ))}

                </div>

            </div>

        </div>
    );
}

export default Gallery;