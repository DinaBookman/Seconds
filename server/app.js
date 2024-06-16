import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import mysql2 from 'mysql2';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cookieParser from 'cookie-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { productsRouter } from './router/productsRouter.js';
// import { todosRouter } from './router/todosRouter.js';
// import { postsRouter } from './router/postsRouter.js';
// import { commentsRouter } from './router/commentsRouter.js';
import { usersRouter } from './router/usersRouter.js';
import { userLoginRouter } from './router/userLoginRouter.js';
// import {Errors} from './middleware/errors.js'
const server = express();
// server.use('/uploads', express.static('uploads'));
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
server.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }))
server.use(express.json());
server.use(bodyparser.json())
server.use(bodyparser.urlencoded({
    extended: true
}))
server.use(cookieParser());




server.use('/products',productsRouter);
server.use('/users',usersRouter);
server.use('/userLogin',userLoginRouter)
// server.use('/posts',postsRouter);
// server.use('/comments',commentsRouter);

// server.use(Errors);

server.listen(8080, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", 8080);
});