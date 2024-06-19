// import multer from 'multer';
// import path from 'path';
import { executeQuery } from './db.js';
import { getQuery, addQuery, deleteQuery, updateQuery } from './queries.js';

export class ProductsService {

    async getProducts(url) {
        const { category, priceMin, priceMax, area, state, sortBy, direction, limit, page } = url;
        const params = [
            { field: 'category', comparison: undefined, value: category },
            { field: 'price', comparison: '>=', value: priceMin },
            { field: 'price', comparison: '<=', value: priceMax },
            { field: 'area', comparison: undefined, value: area },
            { field: 'state', comparison: undefined, value: state }
        ]
        const orderBy = { 'column': sortBy, 'direction': direction };
        let queryProducts = getQuery("seconds.products", params, orderBy, limit, page);
        const result = await executeQuery(queryProducts.sql, queryProducts.queryParams);
        return result;
    }

    async addProduct(productItem, imgSrc) {
        const queryProduct = addQuery("products", [...Object.keys(productItem), 'img', 'adDate']);
        const nowDate = new Date();
        const date = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
        const result = await executeQuery(queryProduct, [...Object.values(productItem), imgSrc, date]);
        return result;
    }

  

    async deleteProduct(id) {

            const queryPost = deleteQuery("products", "id");
            const result = await executeQuery(queryPost, [id])
        return result;
        }
    async updateProduct(productItem, productId) {
            const query = updateQuery('products', productItem);
            const result = await executeQuery(query, [...Object.values(productItem), productId]);
            return result;
        }
}

