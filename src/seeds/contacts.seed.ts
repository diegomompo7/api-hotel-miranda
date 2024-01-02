import mongoose from "mongoose";
import {  Contact } from "../model/ContactInterface";
import { mongoConnect } from "../mongo-repository";
import { faker } from '@faker-js/faker/locale/es';

async function seedDB() {
    try {
        await mongoConnect()
        console.log("Connected correctly to server");

        await Contact.collection.drop();
        console.log("Contacts deleted successfully");

        for (let i = 0; i < 15; i++) {
            const firstName = faker.person.firstName(); // Rowan Nikolaus
            const lastName = faker.person.lastName();
            const email = faker.internet.email({firstName: firstName, lastName: lastName}); 

            const document = new Contact({
                userImg: faker.internet.avatar(),
                name: firstName,
                surname: lastName,
                email: email,
                phone: faker.phone.number().replace(/\D/g, ''),
                date: faker.date.past({ years: 1, refDate: '2024-01-02T00:00:00.000Z' }),
                subject: faker.lorem.sentence(5),
                message: faker.lorem.paragraph(2),
                stars: faker.number.int({ min: 1, max: 5}),
                is_archived: false
            })
            await document.save();
          }




    } catch (err) {
        console.log(err);
    } finally {
        await mongoose.disconnect();
    }
}

seedDB();