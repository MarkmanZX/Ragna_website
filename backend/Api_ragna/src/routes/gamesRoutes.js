import { Router } from 'express';
import supabase from '../config/supabase.js';

const router = Router();

router.get('/', async (req, res) => {
    const { data, error } = await supabase
    .from('games')
    .select('*')
    .order('data', { ascending: true });

    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }
    res.json(data);
});

router.post('/', async (req, res) =>{
    const {
        time_casa,
        time_visitante,
        escudo_time_casa,
        escudo_time_visitante,
        local,
        data,
        horario
    } = req.body;

    if (
        !time_casa ||
        !time_visitante ||
        !local ||
        !data ||
        !horario 
    ){
        return res.status(400).json({
            error: 'Todos os campos obrigatórios devem ser preenchidos.'
        });
    }

    console.log(req.body);

    const { data: game, error } = await supabase
    .from('games')
    .insert([{
        time_casa,
        time_visitante,
        escudo_time_casa,
        escudo_time_visitante,
        local,
        data,
        horario
    }])
    .select();

    if (error){
        return res.status(500).json({
            error: error.message
        });
    }
    res.status(201).json(game);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
    .from('games')
    .select('*')
    .eq('id', id)
    .single();

    if (error){
        return res.status(404).json({
            error: 'Partida não encontrada'
        });
    }
    res.json(data);
});

router.put('/:id', async (req, res) =>{
    const { id } = req.params;

    const {
        time_casa,
        time_visitante,
        escudo_time_casa,
        escudo_time_visitante,
        local,
        data,
        horario
    } = req.body;

    const { data: game, error } = await supabase
    .from('games')
    .update({
        time_casa,
        time_visitante,
        escudo_time_casa,
        escudo_time_visitante,
        local,
        data,
        horario
    })
    .eq('id', id)
    .select()

    if (error){
        return res.status(500).json({
            error: error.message
        });
    }
    res.json(game);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase
    .from('games')
    .delete()
    .eq('id', id);

    if (error){
        return res.status(500).json({
            error: error.message
        });
    }
    res.json({
        message: 'Partida removida com sucesso!'
    });
});

export default router;