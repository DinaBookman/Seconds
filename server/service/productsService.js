// import multer from 'multer';
// import path from 'path';
import { executeQuery } from './db.js';
import { getQuery, addQuery } from './queries.js';

export class ProductsService {
    
    async getProducts(url) {
        const { category, priceMin, priceMax,area, state,sortBy, direction, limit, page } = url;
        const params=[
            { field: 'category', comparison: undefined, value: category },
            { field: 'priceMin', comparison: '>=', value: priceMin },
            { field: 'priceMax', comparison: '<=', value: priceMax },
            { field: 'area', comparison: undefined, value: area },
            { field: 'state', comparison: undefined, value: state }
        ]
        const orderBy= {'column':sortBy,'direction':direction};
        let queryProducts = getQuery("seconds.products",params,orderBy,limit, page );
        const result = await executeQuery(queryProducts.sql,queryProducts.queryParams);
        return result;
    }

    async addProduct(productItem, imgSrc) {
        const queryProduct = addQuery("products", [...Object.keys(productItem),'img','adDate']);
        var nowDate = new Date();
        var date = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
        const result = await executeQuery(queryProduct, [...Object.values(productItem), imgSrc, date]);
        return result;
    }
}


// // const storage = multer.diskStorage({
// //     destination: (req, file, callBack) => {
// //         callBack(null, './uploads');
// //     },
// //     filename: (req, file, callBack) => {
// //         callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
// //     }
// // });

// const upload = multer({ storage: storage }).single('image');

// export class ProductsService {
//     async addProduct(productItem, fileData) {
//         return new Promise((resolve, reject) => {
//             upload(fileData, async (err) => {
//                 if (err) {
//                     console.error('Error uploading file:', err);
//                     reject('Error uploading file');
//                     return;
//                 }
//                 if (!fileData) {
//                     console.log("No file uploaded");
//                     reject('No file uploaded');
//                     return;
//                 }
//                 const imgSrc = 'http://localhost:8080/uploads/' + fileData.filename;
//                 const { ownerId, title, description, category, state, area, price, adDate } = productItem;
//                 const queryProduct = addQuery("products", productItem);
//                 try {
//                     const result = await executeQuery(queryProduct, [ownerId, title, description, category, state, area, price, imgSrc, adDate]);
//                     resolve(result);
//                 } catch (error) {
//                     console.error('Error adding product:', error);
//                     reject('Error adding product');
//                 }
//             });
//         });
//     }
// }
