import { Router } from 'express';
import upload from '../middlewares/upload.js';
import supabase from '../config/supabase.js';

const router = Router();

router.post(
    '/gallery',
    upload.single('imagem'),
    async (req, res) => {

        try {

            const file = req.file;

            const fileName = `${Date.now()}-${file.originalname}`;

            const { error } = await supabase.storage
                .from('gallery')
                .upload(fileName, file.buffer, {
                    contentType: file.mimetype
                });

            if (error) {
                return res.status(500).json({
                    error: error.message
                });
            }

            const { data } = supabase.storage
                .from('gallery')
                .getPublicUrl(fileName);

            res.json({
                url: data.publicUrl
            });

        } catch (err) {

            console.error(err);

            res.status(500).json({
                error: err.message
            });

        }
    }
);

export default router;