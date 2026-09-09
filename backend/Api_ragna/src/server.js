import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import playersRoutes from './routes/playersRoutes.js';
import gamesRoutes from './routes/gamesRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'API do Ragna FC online'
    });
});

app.use('/players', playersRoutes);
app.use('/games', gamesRoutes);
app.use('/gallery', galleryRoutes);
app.use('/upload', uploadRoutes);
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});