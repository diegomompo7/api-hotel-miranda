import booking from "../data/booking.json"


export const getBookings = async() :Promise<Object[]> => {
    return booking
}
    
export const getBookingsId = async(id: string) :Promise<Object> => {
        return booking.find((booking) => booking.id === parseInt(id))!
}

export const postBookings = async()  :Promise<void>  => {
}
export const patchBookings = async() :Promise<void> => {
    
}
export const deleteBookings = async()  :Promise<void>  => {
  
}