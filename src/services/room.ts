import { Document } from "mongoose"
import { Room, IRoom, IRoomCreate } from "../model/RoomInterface"


export const getRooms = async() :Promise<IRoom[]> => {
    return await Room.find()
}
    
export const getRoomsId = async(id: string) :Promise<Document<IRoom> | null> => {
    return await Room.findById(id)
}

export const postRoom = async(roomData: IRoomCreate): Promise<Document<IRoom>>  => {
    const room = new Room(roomData)
    const document: Document<IRoom> = (await room.save()) as any
    return document

}
export const patchRoom = async(id: string, roomData: any): Promise<Document<IRoom> | null> => {
    return await Room.findByIdAndUpdate(id, roomData, { new: true, runValidators: true })
}

export const deleteRoom = async(id:string): Promise<IRoom>  => {
    return await Room.findByIdAndDelete(id).lean()
}