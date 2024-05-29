import mysql from 'mysql2/promise';
import 'dotenv/config';

async function executeQuery(query, params){
    let results;
    const connection = await mysql.createConnection({
    host: '127.0.0.1',
        user: 'root',
        database: process.env.DB_NAME,
        password: process.env.PASSWORD
    });

    try {      
        [results,] = await connection.execute(query,params);

    } catch (err) {
        console.log(err);
    }
    finally {
        connection.end();
    }
    return results;
}

function escapeId(identifier) {
    return mysql.escapeId(identifier);
}

export {
    executeQuery,
    escapeId
};