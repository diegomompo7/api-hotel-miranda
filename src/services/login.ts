import users from '../data/users.json';
import { UserInterface } from '../model/UserInterface';

export const postLogin = async(email: any, password:any) :Promise<boolean> => {
        const userCheck: UserInterface = users.find(user => user.email === email && user.password === password)!;

        return userCheck ? true : false;
}
  