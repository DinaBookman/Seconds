import { executeQuery } from './db.js';
import { getQuery, getByIdQuery,addQuery, deleteQuery, updateQuery } from './queries.js';

export class UsersService {
    async getUserById(id) {
        const query = getByIdQuery('users');
        const result = await executeQuery(query, [id]);
        return result;
    }
}