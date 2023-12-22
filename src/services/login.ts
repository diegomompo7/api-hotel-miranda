import users from '../data/users.json';
import { UserInterface } from '../model/UserInterface';
const bcrypt = require("bcrypt")

export const postLogin = async(email: any, password:any) :Promise<UserInterface | undefined> => {
        const userCheck: UserInterface | undefined = users.find(user => user.email === email && bcrypt.compare(user.password,password));

        return userCheck || undefined
}
   