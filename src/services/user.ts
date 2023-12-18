import { UserInterface } from "../model/UserInterface";
import users from "../data/users.json"


export const getUsers = async() :Promise<UserInterface[]> => {
    return users
}

export const postUsers = async() :Promise<Object[]> => {
    return [{success: "user create successfully"}]
}
export const patchUsers = async() :Promise<Object[]> => {
    return [{success: "user update successfully"}]
}
export const deleteUsers = async() :Promise<Object[]> => {
    return [{success: "user deleted successfully"}]
}