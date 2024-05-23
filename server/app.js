import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import mysql2 from 'mysql2';
import multer from 'multer';
import path from 'path';
import { executeQuery } from './service/db.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { productsRouter } from './router/productsRouter.js';
// import { todosRouter } from './router/todosRouter.js';
// import { postsRouter } from './router/postsRouter.js';
// import { commentsRouter } from './router/commentsRouter.js';
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
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/'); // Ensure this directory exists
//     },
//     filename: (req, file, cb) => {
//       cb(null, `${Date.now()}-${file.originalname}`);
//     }
//   });
var upload = multer({
    storage: storage
});

// //! Routes start

// //route for Home page
// server.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../server', 'index.html'));
//   });
  
//   //@type   POST
//   //route for post data
//   server.post("/uploading", upload.single('image'), (req, res) => {
//       if (!req.file) {
//           console.log("No file upload");
//       } else {
//           console.log(req.file.filename)
//           var imgsrc = 'http://localhost:8080/uploads/' + req.file.filename
//           var insertData = "INSERT INTO seconds.products (ownerId,title,description,category,state,area,price,img,adDate)VALUES(1,'a','b',1,1,'J',100,?,'1000-01-01')"
//           executeQuery(insertData, [imgsrc], (err, result) => {
//               if (err) throw err
//               console.log("file uploaded")
//     res.send('Image Has been uploaded, please check your directory and mysql database....');
//           })
//       }
//   });
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