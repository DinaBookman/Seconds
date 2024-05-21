import express from 'express';
import cors from 'cors';

import { productsRouter } from './router/productsRouter.js';
// import { todosRouter } from './router/todosRouter.js';
// import { postsRouter } from './router/postsRouter.js';
// import { commentsRouter } from './router/commentsRouter.js';
// import { user_loginsRouter } from './router/user_loginsRouter.js';
// import {Errors} from './middleware/errors.js'
const server = express();
server.use(cors())
server.use(express.json());
server.use('/products',productsRouter);
// server.use('/todos',todosRouter);
// server.use('/posts',postsRouter);
// server.use('/comments',commentsRouter);
// server.use('/user_logins',user_loginsRouter)
// server.use(Errors);




server.listen(8080, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", 8080);
});