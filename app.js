import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import indexRouter from './routes/index.js';
import authRouter from './routes/routerAuth.js';

const pathFile = fileURLToPath(import.meta.url);
const name_path = path.dirname(pathFile);

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(name_path, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/auth', authRouter);

export default app;