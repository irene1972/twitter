import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usuarioRoutes from './routes/usuarioRoutes.js';
import imagenRoutes from './routes/imagenRoutes.js';
import comentarioRoutes from './routes/comentarioRoutes.js';
import likeRoutes from './routes/likeRoutes.js';
/*
const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
};

const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true,
  optionsSuccessStatus: 200
};
*/
const app=express();

//app.use(cors(corsOptions));
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

dotenv.config();

app.use('/api/usuarios',usuarioRoutes);
app.use('/api/imagenes',imagenRoutes);
app.use('/api/comentarios',comentarioRoutes);
app.use('/api/likes',likeRoutes);
app.use('/imgs', express.static('public/imgs'));
app.use('/imagenes', express.static('public/imagenes'));

const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});