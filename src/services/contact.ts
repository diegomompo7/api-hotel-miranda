import { ContactInterface } from "../model/ContactInterface";
import contact from "../data/contact.json"


export const getContacts = async() :Promise<ContactInterface[]> => {
    return contact
}

export const getContactId = async(id: string) :Promise<Object> => {
    return contact.find((contact) => contact.id === parseInt(id))!
}

export const postContacts = async() :Promise<void> => {
}
export const patchContacts = async() :Promise<void> => {
 
}
export const deleteContacts = async() :Promise<void> => {

}