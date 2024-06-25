import { executeQuery } from './db.js';
import { getQuery, getByIdQuery, addQuery, deleteQuery, updateQuery } from './queries.js';
import bcrypt from 'bcrypt'
const SALTROUNDS = 10;

export class UserLoginService {

    async addUserLogin(newUser) {
        console.log(newUser);
        const query = addQuery('userlogin', [...Object.keys(newUser)]);
        const encryptPassword = await bcrypt.hash(newUser.password, SALTROUNDS);
        const result = await executeQuery(query, [newUser.id, newUser.username, encryptPassword]);
        return result;
    }

    async checkUserLogin(newUser) {
        const queryUsers = getQuery('userlogin', [{ field: 'username', comparison: undefined, value: newUser.username }]);
        const result = await executeQuery(queryUsers.sql, queryUsers.queryParams);
        return (result.length!=0)?
            (bcrypt.compare(newUser.password, result[0].password)?result[0].id:false): false ;
    }

    async getUserLogin(query){
        const queryUsers = getQuery('userlogin', [{ field: 'username', comparison: undefined, value: query.username }]);
        const result = await executeQuery(queryUsers.sql, queryUsers.queryParams);
        return result;
    }


    async updateLogin(loginItem, loginId) {
        const query = updateQuery('userLogin', loginItem);
        const result = await executeQuery(query, [...Object.values(loginItem), loginId]);
        return result;
    }
}