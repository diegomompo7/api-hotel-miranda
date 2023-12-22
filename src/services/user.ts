import { UserInterface } from "../model/UserInterface";
import users from "../data/users.json"


export const getUsers = async() :Promise<UserInterface[]> => {
    return users
}

export const getUserId = async(id: string) :Promise<Object> => {
    return users.find((user) => user.id === parseInt(id))!
}

export const postUsers = async() :Promise<void> => {

}
export const patchUsers = async() :Promise<void> => {

}
export const deleteUsers = async() :Promise<void> => {

}