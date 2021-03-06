import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import routes from './routes';
import '../typeorm';
import '../../container';
import uploadConfig from '../../../config/upload';
import AppError from '../../errors/AppError';
import cors from 'cors';
import {errors} from 'celebrate';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use(errors());

app.use((erro: Error, request: Request, response: Response, next: NextFunction) => {

    if (erro instanceof AppError) {
        return response.status(erro.statusCode).json({
            status: 'error',
            message: erro.message
        })
    }

    console.error(erro);

    return response.status(500).json({
        status:'error',
        message:'Internal server error'
    });

})

app.listen(3333, () => {
    console.log('Servidor iniciado');
});
