const getAllQuery = (table,orderBy,limit) => {
    const query = `SELECT * FROM seconds.${table} ${orderBy?'order by '+ orderBy:''} ${limit?'limit '+ limit:''} `;
    return query
}
const addQuery = (table,columns) => {
    const query = `INSERT INTO seconds.${table} (${columns.map((column)=>column)}) VALUES (${columns.map((column)=>'?')})`;
    return query
}
export{getAllQuery , addQuery}