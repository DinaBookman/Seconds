
import { escapeId } from './db.js';
import 'dotenv/config';

const getProductsJoinTable = () => {

    const sql = `(SELECT products.id, products.ownerId, products.title,products.description, categories.displayName AS category,statuses.description AS status,products.area,products.price,products.img,products.adDate,products.deactivated FROM ${process.env.DB_NAME}.products INNER JOIN ${process.env.DB_NAME}.categories ON products.categoryId = categories.id INNER JOIN ${process.env.DB_NAME}.statuses ON products.statusId = statuses.id) AS completeProductes`;
    return sql;
}

function getQuery(table, params, orderBy, limit, offset) {
    let sql = `SELECT * FROM ${table} WHERE ifnull(deactivated,0) = 0`;

    const queryParams = [];

    params.map(param => {

        if (param.value !== undefined) {

            if (param.comparison) {
                sql += ` AND ${escapeId(param.field)} ${param.comparison} ?`;
            } else {

                sql += ` AND ${escapeId(param.field)} = ?`;
            }
            queryParams.push(param.value);
        }

    });



    if (orderBy && orderBy.column) {

        sql += ` ORDER BY ${escapeId(orderBy.column)} ${orderBy.direction === 'DESC' ? 'DESC' : 'ASC'}`;
    }

    // Add LIMIT clause if specified
    if (limit !== undefined) {
        sql += ' LIMIT ?';
        queryParams.push(limit);
    }

    // Add OFFSET clause if specified
    if (offset !== undefined) {
        sql += ' OFFSET ?';
        queryParams.push(offset);
    }

console.log(sql)
    return { sql, queryParams };
}

const getProductByIdQuery = (table1, table2) => {
    const query = `SELECT completeProductes.title,completeProductes.description,completeProductes.category,completeProductes.status,completeProductes.area,completeProductes.price,completeProductes.img,u.name,u.email,u.phone FROM ${table1}   join ${process.env.DB_NAME}.${escapeId(table2)} u where ifnull(completeProductes.deactivated,0) = 0 and ifnull(u.deactivated,0) = 0 and completeProductes.id = ? and completeProductes.ownerId=u.id`;
    return query
}

const getByIdQuery = (table) => {
    const query = `select * from ${process.env.DB_NAME}.${escapeId(table)} where ifnull(deactivated,0) = 0 and id = ?`;
    return query;
}
const getCategoryStatusQuery = (table) => {
    const query = `select * from ${process.env.DB_NAME}.${escapeId(table)}`;
    return query;
}

const getByIdCategoryStatusQuery = (table) => {
    const query = `select * from ${process.env.DB_NAME}.${escapeId(table)} where id = ?`;
    return query;
}
const addQuery = (table, columns) => {
    const query = `INSERT INTO ${process.env.DB_NAME}.${escapeId(table)} (${columns.map((column) => escapeId(column))}) VALUES (${columns.map(() => '?')})`;
    return query
}
const deleteQuery = (table) => {
    const query = `UPDATE ${process.env.DB_NAME}.${escapeId(table)} SET deactivated = 1 WHERE (id = ?)`;
    return query
}

const updateQuery = (table, columns) => {
    const columnsNames = Object.keys(columns);
    const query = `UPDATE ${process.env.DB_NAME}.${escapeId(table)} SET ${columnsNames.map((column) => (escapeId(column) + '=?'))} WHERE (id = ?)`;
    return query
}
export { getProductsJoinTable, getQuery, getByIdQuery,getByIdCategoryStatusQuery,getCategoryStatusQuery, addQuery, deleteQuery, updateQuery, getProductByIdQuery }