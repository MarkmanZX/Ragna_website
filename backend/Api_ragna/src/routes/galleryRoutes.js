import { Router } from 'express';
import supabase from '../config/supabase.js';
import upload from '../middlewares/upload.js';

const router = Router();

router.get('/', async (req, res) => {
    const { data, error } = await supabase
    .from('gallery')
    .select('*');

    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }
    res.json(data);
});

router.get('/:id', async (req,res) => {
    const { id } = req.params;

    const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .eq('id', id)
    .single();

    if (error) {
        return res.status(404).json({
            error: 'Imagem não encontrada.'
        });
    }
    res.json(data);
});

router.post(
    '/',
    upload.single('imagem'),
    async (req, res) => {

        try {

            if (!req.file) {
                return res.status(400).json({
                    error: 'Imagem obrigatória.'
                });
            }

            const fileName =
                `${Date.now()}-${req.file.originalname}`;

            const { error: uploadError } =
                await supabase.storage
                    .from('gallery')
                    .upload(
                        fileName,
                        req.file.buffer,
                        {
                            contentType: req.file.mimetype
                        }
                    );

            if (uploadError) {
                return res.status(500).json({
                    error: uploadError.message
                });
            }

            const { data: publicData } =
                supabase.storage
                    .from('gallery')
                    .getPublicUrl(fileName);

            const imageUrl =
                publicData.publicUrl;

            const { data, error } =
                await supabase
                    .from('gallery')
                    .insert([
                        {
                            imagem: imageUrl
                        }
                    ])
                    .select();

            if (error) {
                return res.status(500).json({
                    error: error.message
                });
            }

            res.status(201).json(data);

        } catch (err) {

            console.error(err);

            res.status(500).json({
                error: err.message
            });

        }

    }
);

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { imagem } = req.body;

    const { data, error } = await supabase
    .from('gallery')
    .update({
        imagem
    })
    .eq('id', id)
    .select();

    if (error){
        return res.status(500).json({
            error: error.message 
        });
    }
    res.json(data);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase
    .from('gallery')
    .delete()
    .eq('id', id);

    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }

    res.json({
        message: 'Imagem removida com sucesso.'
    });
});

export default router;