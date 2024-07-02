import { executeQuery } from './db.js';
import { getByIdCategoryStatusQuery ,getCategoryStatusQuery} from './queries.js'
export class CategoriesService {
    async getCategories() {
        const query = getCategoryStatusQuery('categories');
        const result = await executeQuery(query);
        return result;
    }
    async getCategory(id) {
        const query = getByIdCategoryStatusQuery('categories');
        const result = await executeQuery(query, [id]);
        return result;
    }
}