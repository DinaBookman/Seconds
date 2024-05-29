import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import mysql2 from 'mysql2';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { productsRouter } from './router/productsRouter.js';
// import { todosRouter } from './router/todosRouter.js';
// import { postsRouter } from './router/postsRouter.js';
// import { commentsRouter } from './router/commentsRouter.js';
import { usersRouter } from './router/usersRouter.js';
// import { user_loginsRouter } from './router/user_loginsRouter.js';
// import {Errors} from './middleware/errors.js'
const server = express();
server.use('/uploads', express.static('uploads'));
server.use(cors())
server.use(express.json());
server.use(bodyparser.json())
server.use(bodyparser.urlencoded({
    extended: true
}))

var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './uploads')     // './uploads/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({
    storage: storage
});


server.use('/products',productsRouter);
server.use('/users',usersRouter);
//server.use('/user_logins',user_loginsRouter)
// server.use('/posts',postsRouter);
// server.use('/comments',commentsRouter);

// server.use(Errors);

server.listen(8080, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", 8080);
});