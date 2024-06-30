
import { escapeId } from './db.js';

function getQuery(table, params, orderBy, limit, offset) {
    let sql = `SELECT * FROM ${escapeId(table)} WHERE ifnull(deactivated,0) = 0`;
    const queryParams = [];

    params.map(param => {
  
        if (param.value!== undefined) {

            if (param.comparison) {
                sql += ` AND ${escapeId(param.field)} ${param.comparison} ?`;
            } else {

                sql += ` AND ${escapeId(param.field)} = ?`;
            }
            queryParams.push(param.value);
        }

    });



    if (orderBy&&orderBy.column) {

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


    return { sql, queryParams };
}

const getProductByIdQuery = (table1,table2) => {
    const query = `SELECT p.title,p.description,p.category,p.state,p.area,p.price,p.img,u.name,u.email,u.phone FROM ${escapeId(table1)} p join ${escapeId(table2)} u where ifnull(p.deactivated,0) = 0 and ifnull(u.deactivated,0) = 0 and p.id = ? and p.ownerId=u.id`;
    return query
}

const getByIdQuery=(table)=>{
    const query = `select * from ${escapeId(table)} where ifnull(deactivated,0) = 0 and id = ?`;
    return query;
}

const addQuery = (table, columns) => {
    const query = `INSERT INTO ${escapeId(table)} (${columns.map((column) => escapeId(column))}) VALUES (${columns.map(() => '?')})`;
    return query
}
const deleteQuery = (table) => {
    const query = `DELETE FROM ${escapeId(table)} WHERE (id = ?)`;
    return query
}

const updateQuery = (table,columns) => {
    const columnsNames=Object.keys(columns);
    const query = `UPDATE ${escapeId(table)} SET ${columnsNames.map((column)=>(escapeId(column)+'=?'))} WHERE (id = ?)`;
    return query
}
export { getQuery,getByIdQuery, addQuery,deleteQuery,updateQuery ,getProductByIdQuery}