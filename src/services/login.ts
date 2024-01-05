
import { User, IUser} from '../model/UserInterface';

export const postLogin = async(userLogin: any) :Promise<IUser | null> => {
        return await User.findOne({email: userLogin.email, password: userLogin.password}).exec()
}
   