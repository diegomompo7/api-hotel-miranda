import { ContactInterface } from "../model/ContactInterface";
import contact from "../data/contact.json"


export const getContacts = async() :Promise<ContactInterface[]> => {
    return contact
}

export const postContacts = async() :Promise<Object[]> => {
    return [{success: "contact create successfully"}]
}
export const patchContacts = async() :Promise<Object[]> => {
    return [{success: "contact update successfully"}]
}
export const deleteContacts = async() :Promise<Object[]> => {
    return [{success: "contact deleted successfully"}]
}