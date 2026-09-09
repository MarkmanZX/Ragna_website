import { Router } from 'express';
import supabase from '../config/supabase.js';
import upload from '../middlewares/upload.js';

const router = Router();

router.get('/', async (req, res) => {
    const { data, error } = await supabase
    .from('players')
    .select('*');

    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }

    const players = data.map(player => {
        let idade = null;

        if (player.data_nascimento) {
            const hoje = new Date();
            const nascimento = new Date(player.data_nascimento);

            idade = hoje.getFullYear() - nascimento.getFullYear();
            
            const aniversarioNaoPassou = 
                hoje.getMonth() < nascimento.getMonth() ||
                (
                    hoje.getMonth() === nascimento.getMonth() &&
                    hoje.getDate() < nascimento.getDate()
                );
            
            if (aniversarioNaoPassou) {
                idade--;
            }
        }

        return {
            ...player,
            idade
        };
    });
    res.json(players);
});

router.post('players/', upload.single('foto'), async (req, res) => {
    const {
        nome,
        posicao,
        pe_dominante,
        data_nascimento
    } = req.body;

    if (!nome || !posicao || !pe_dominante || !data_nascimento) {
        return res.status(400).json({
            error: 'Nome, posição, pé dominante e data de nascimento são obrigatórios'
        });
    }

    let foto_url = null;

    if(req.file){
        const fileName = 
        `${Date.now()}-${req.file.originalname}`;

        const { error: uploadError } = 
        await supabase.storage
            .from('players')
            .upload(
                fileName,
                req.file.buffer,
                {
                    contentType: req.file.mimetype
                }
            );
        if(uploadError) {
            return res.status(500).json({
                error: uploadError.message
            });
        }

        const { data } = 
        supabase.storage
        .from('players')
        .getPublicUrl(fileName);

        foto_url = data.publicUrl;
    }

    const { data, error } = await supabase
    .from('players')
    .insert([{
        nome,
        posicao,
        pe_dominante,
        data_nascimento,
        foto_url
    }])
    .select();

    if (error) { 
        return res.status(500).json({
            error: error.message
        });
    }
    res.status(201).json(data);
});

router.get('/players/:id', async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
    .from('players')
    .select('*')
    .eq('id', id)
    .single();

    if (error) {
        return res.status(404).json({
            error: 'Jogador não encontrado'
        });
    }
    
    let idade = null;

    if (data.data_nascimento) {
        const hoje = new Date();
        const nascimento = new Date(data.data_nascimento);

        idade = hoje.getFullYear() - nascimento.getFullYear();

        const aniversarioNaoPassou = 
            hoje.getMonth() < nascimento.getMonth() ||
            (
                hoje.getMonth() === nascimento.getMonth() &&
                hoje.getDate() < nascimento.getDate()
            );
        if (aniversarioNaoPassou) {
            idade--;
        };
    }
    res.json({
        ...data,
        idade
    })
});

router.put('/players/:id', async (req, res) => {
    const { id } =req.params;

    const {
        nome,
        posicao,
        pe_dominante,
        data_nascimento,
        foto_url
    } = req.body;

    const { data, error } = await supabase
    .from('players')
    .update({
        nome,
        posicao,
        pe_dominante,
        data_nascimento,
        foto_url
    })
    .eq('id', id)
    .select();

    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }
    res.json(data);
});

router.delete('/players/:id', async (req, res) => {
    const { id } = req.params;

    const {error} = await supabase
    .from('players')
    .delete()
    .eq('id', id);

    if (error){
        return res.status(500).json({
            error: error.message
        });
    }
    res.json({
        message: 'Jogador removido com sucesso.'
    });
});

export default router;