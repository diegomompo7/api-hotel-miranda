import { Document } from "mongoose"
import { Contact, IContact, IContactCreate } from "../model/ContactInterface"


export const getContacts = async() :Promise<IContact[]> => {
    return await Contact.find()
}
    
export const getContactsId = async(id: string) :Promise<Document<IContact> | null> => {
    return await Contact.findById(id)
}

export const postContact = async(contactData: IContactCreate): Promise<Document<IContact>>  => {
    const contact = new Contact(contactData)
    const document: Document<IContact> = (await contact.save()) as any
    return document

}
export const patchContact = async(id: string, contactData: any): Promise<Document<IContact> | null> => {
    return await Contact.findByIdAndUpdate(id, contactData, { new: true, runValidators: true })
}

export const deleteContact = async(id:string): Promise<IContact>  => {
    return await Contact.findByIdAndDelete(id).populate(["room"])
}