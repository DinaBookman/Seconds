const getAllQuery = (table,orderBy,limit) => {
    const query = `SELECT * FROM seconds.${table} ${orderBy?'order by '+ orderBy:''} ${limit?'limit '+ limit:''} `;
    return query
}
export{getAllQuery}