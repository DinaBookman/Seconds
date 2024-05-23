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
        console.log("Query:", query);
        const bb =[1,'a','rrrrrrrr',1,1,'f',10000,'0999-12-31'];
        console.log("Params:", params);
        
        [results,] = await connection.execute(query,params);

    } catch (err) {
        console.log(err);
    }
    finally {
        connection.end();
    }
    return results;
}

export{
    executeQuery
}