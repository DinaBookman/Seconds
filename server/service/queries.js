const getQuery = (table, params) => {
    let query = `SELECT * FROM seconds.${table} where 1=1 `;
    const queryParams = [];

    if (params.category) {
        query += ' AND category = ?';
        queryParams.push(params.category);
    }
    if (params.priceMin) {
        query += ' AND price >= ?';
        queryParams.push(params.priceMin);
    }
    if (params.priceMax) {
        query += ' AND price <= ?';
        queryParams.push(params.priceMax);
    }
    if (params.area) {
        query += ' AND area = ?';
        queryParams.push(params.area);
    }

    if (params.state) {
        query += ' AND state = ?';
        queryParams.push(params.state);
    }
    if (params.orderBy) {
        query += ` ORDER BY ${params.orderBy.column}  ${orderBy.direction === 'DESC' ? 'DESC' : 'ASC'}`;
    }
    // console.log("jjjjjjj")
    // query += ' LIMIT ? OFFSET ?';
    // queryParams.push(limit, offset);
    return ({ query: query, params: queryParams })
}
const addQuery = (table, columns) => {
    const query = `INSERT INTO seconds.${table} (${columns.map((column) => column)}) VALUES (${columns.map((column) => '?')})`;
    return query
}
export { getQuery, addQuery }