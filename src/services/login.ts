
import { User, IUser} from '../model/UserInterface';
const bcrypt = require("bcrypt")

export const postLogin = async(userLogin: any) :Promise<IUser | null> => {
        return await User.findOne({email: userLogin.email, password: userLogin.password}).exec()
}
   