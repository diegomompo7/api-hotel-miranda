import mongoose from "mongoose";
import { User } from "../model/UserInterface";
import { mongoConnect } from "../mongo-repository";
import { faker } from '@faker-js/faker/locale/es';

/*
export interface IUserCreate {
  photo: string;
  fullName: string;
  job: string;
  email: string;
  phone: string;
  startDate: string;
  descriptionJob: string;
  status: string;
  password: string;
}
*/
async function seedDB() {
    try {
        await mongoConnect()
        console.log("Connected correctly to server");

        await User.collection.drop();
        console.log("Users deleted successfully");


        const avatar = faker.internet.avatar(); // Rowan Nikolaus
        const randomName = faker.person.fullName(); // Rowan Nikolaus
        const firstName = randomName.split(" ")[0].toLowerCase()
        const lastName = randomName.split(" ")[1].toLowerCase()
        const job= faker.helpers.arrayElement(['Manager', 'Recepcionist', 'Room Service'])
        const randomEmail = faker.internet.email({firstName: firstName, lastName: lastName}); // Kassandra.Haley@erich.biz
        const phone = faker.phone.number()
        const startDate = 



    } catch (err) {
        console.log(err);
    } finally {
        await mongoose.disconnect();
    }
}

seedDB();