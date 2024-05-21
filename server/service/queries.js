const getAllQuery = (table,orderBy,limit) => {
    const query = `SELECT * FROM nodeproject.${table} ${orderBy?'order by '+ orderBy:''} ${limit?'limit '+ limit:''} `;
    return query
}