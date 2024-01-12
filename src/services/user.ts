import { Document } from "mongoose"
import { User, IUser, IUserCreate } from "../model/UserInterface"


export const getUsers = async() :Promise<IUser[]> => {
    return await User.find()
}
    
export const getUsersId = async(id: string) :Promise<Document<IUser> | null> => {
    return await User.findById(id)
}

export const postUser = async(userData: IUserCreate): Promise<Document<IUser>>  => {
    const user = new User(userData)
    const document: Document<IUser> = (await user.save()) as any
    return document

}
export const patchUser = async(id: string, userData: any): Promise<Document<IUser> | null> => {
    return await User.findByIdAndUpdate(id, userData, { new: true, runValidators: true })
}

export const deleteUser = async(id:string): Promise<Document<IUser> | null>  => {
    return await User.findByIdAndDelete(id).lean()
}