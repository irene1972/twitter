import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import propiedadRoutes from './routes/propiedadRoutes.js';

const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
};

const app=express();

app.use(express.json());

app.use(cors(corsOptions));

dotenv.config();

app.use('/api/propiedades',propiedadRoutes);

const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});