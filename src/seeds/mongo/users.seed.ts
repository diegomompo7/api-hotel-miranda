import mongoose from "mongoose";
import { User } from "../../model/UserInterface";
import { mongoConnect } from "../../databases/mongo-repository";
import { faker } from "@faker-js/faker/locale/es";

async function seedDB() {
  try {
    await mongoConnect();
    console.log("Connected correctly to server");

    await User.collection.drop();
    console.log("Users deleted successfully");

    for (let i = 0; i < 15; i++) {
      const fullName = faker.person.fullName(); // Rowan Nikolaus
      const firstName = fullName.split(" ")[0].toLowerCase();
      const lastName = fullName.split(" ")[1].toLowerCase();
      const email = faker.internet.email({
        firstName: firstName,
        lastName: lastName,
      });
      const job = faker.helpers.arrayElement([
        "Manager",
        "Recepcionist",
        "Room Service",
      ]);

      const document = new User({
        photo: faker.internet.avatar(),
        fullName: fullName,
        job: job,
        email: email,
        phone: faker.phone.number().replace(/\D/g, ""),
        startDate: faker.date
          .past({ years: 1, refDate: "2024-01-02T00:00:00.000Z" })
          .toLocaleDateString()
          .replace(/\//g, "-"),
        descriptionJob: job,
        status: faker.helpers.arrayElement(["ACTIVE", "INACTIVE"]),
        password: faker.internet.password({ memorable: true }),
      });
      await document.save();
    }
  } catch (err) {
    console.log(err);
  } finally {
    await mongoose.disconnect();
  }
}

seedDB();
