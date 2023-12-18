import { RoomInterface } from "../model/RoomInterface";
import rooms from "../data/rooms.json"


export const getRooms = async() :Promise<RoomInterface[]> => {
    return rooms
}

export const postRooms = async() :Promise<Object[]> => {
    return [{success: "rooms create successfully"}]
}
export const patchRooms = async() :Promise<Object[]> => {
    return [{success: "rooms update successfully"}]
}
export const deleteRooms = async() :Promise<Object[]> => {
    return [{success: "rooms deleted successfully"}]
}