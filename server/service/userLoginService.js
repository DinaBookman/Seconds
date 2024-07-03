import { executeQuery } from './db.js';
import { getQuery, getByIdQuery, addQuery, deleteQuery, updateQuery } from './queries.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
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
        console.log("חוטכאטכ")
        if(result.length===0)
            throw new Error("Doesn't exist")
        console.log("לללללללללללל")
        if (result.length != 0 && !bcrypt.compare(newUser.password, result[0].password))
            throw new Error("Password error")
        console.log("ממממממממממ")

        const token = jwt.sign({ id: result[0].username }, "privateKey", { expiresIn: '20m' });
       // const refreshtoken = jwt.sign({ id: result[0].username }, "keyrefresh", { expiresIn: '1d' });
        return token;
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