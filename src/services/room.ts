import { RoomInterface } from "../model/RoomInterface";
import rooms from "../data/rooms.json"


export const getRooms = async() :Promise<RoomInterface[]> => {
    return rooms
}

export const getRoomId = async(id: string) :Promise<Object> => {
    return rooms.find((room) => room.id === parseInt(id))!
}

export const postRooms = async() :Promise<void> => {
    
}
export const patchRooms = async() :Promise<void> => {
    
}
export const deleteRooms = async() :Promise<void> => {
    
}