import { executeQuery } from './db.js';
import { getByIdCategoryStatusQuery ,getCategoryStatusQuery} from './queries.js'
export class StatusesService {
    async getStatuses() {
        const query = getCategoryStatusQuery('statuses');
        const result = await executeQuery(query);
        return result;
    }
    async getStatus(id) {
        const query = getByIdCategoryStatusQuery('statuses');
        const result = await executeQuery(query, [id]);
        return result;
    }
}