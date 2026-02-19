import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usuarioRoutes from './routes/usuarioRoutes.js';
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

const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});