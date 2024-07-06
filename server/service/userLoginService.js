import { executeQuery } from './db.js';
import { getQuery, getByIdQuery, addQuery, deleteQuery, updateQuery } from './queries.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config';
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

        if (result.length === 0)
            throw new Error("Doesn't exist")

        if (result.length != 0 && !bcrypt.compare(newUser.password, result[0].password))
            throw new Error("Password error")

        const token = jwt.sign({ id: result[0].username }, process.env.WEB_TOKEN_KEY, { expiresIn: '20m' });
        const refreshtoken = jwt.sign({ id: result[0].username }, process.env.WEB_TOKEN_REFRESH_KEY, { expiresIn: '1d' });
        console.log(token, refreshtoken)
        return [token, refreshtoken,{id:result[0].id,usename:result[0].username}];
    }

    async getUserLogin(query) {
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