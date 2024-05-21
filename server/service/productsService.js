import { executeQuery } from './db.js';

import { getAllQuery } from './queries.js';

export class ProductsService {

    async getProducts() {
        
        let queryProducts = getAllQuery("products");
        // queryComment+=getSpecialParamsQuery(["id","postId","name","email","body"],limit)
        const result =  await executeQuery(queryProducts);
        return result;
    }

//     async addComment(commentItem) {

//          const queryComment=addQuery("comments",[ "postId" ,"name","email","body"]);
//          const result= await executeQuery(queryComment,[ commentItem.postId ,commentItem.name ,commentItem.email,commentItem.body])
//          return result;
//     }
//     async deleteComment(id) {

//         const queryComment=deleteQuery("comments","id");
//         const result= await executeQuery(queryComment,[id])
//         return result;
//    }
//    async updateComment(commentItem) {

//     const queryComment=updateQuery("comments",[ "name","body"]);
//     const result= await executeQuery(queryComment,[commentItem.name,commentItem.body,commentItem.id])
//     return result;
// }

}