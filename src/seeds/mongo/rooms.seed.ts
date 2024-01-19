import mongoose from "mongoose";
import { Room } from "../../model/RoomInterface";
import { mongoConnect } from "../../databases/mongo-repository";
import { faker } from "@faker-js/faker/locale/es";

export interface IRoomCreate {
  photos: string[];
  roomType: string;
  roomNumber: string;
  description: string;
  offer: string;
  priceNight: number;
  discount: number | null;
  cancellation: string;
  amenities: string[];
  status: string;
}

async function seedDB() {
  try {
    await mongoConnect();
    console.log("Connected correctly to server");

    await Room.collection.drop();
    console.log("Rooms deleted successfully");

    for (let i = 0; i < 15; i++) {
      const offer = faker.helpers.arrayElement(["YES", "NO"]);

      const document = new Room({
        photos: [
          faker.image.urlLoremFlickr({ category: "hotel,bedroom" }),
          faker.image.urlLoremFlickr({ category: "hotel,bedroom" }),
          faker.image.urlLoremFlickr({ category: "hotel,bedroom" }),
        ],
        roomType: faker.helpers.arrayElement([
          "Single Bed",
          "Double Bed",
          "Double Superior",
          "Suite",
        ]),
        roomNumber: faker.lorem.word() + "-" + faker.number.int({ max: 500 }),
        description: faker.lorem.paragraph(2),
        offer: offer,
        priceNight: faker.commerce.price({ min: 50, max: 300, dec: 2 }),
        discount: offer === "YES" ? faker.number.int({ min: 10, max: 50 }) : 0,
        cancellation: faker.lorem.paragraph(2),
        amenities: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
        status: "Available",
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
