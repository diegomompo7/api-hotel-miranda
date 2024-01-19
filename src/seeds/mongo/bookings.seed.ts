import mongoose from "mongoose";
import { Booking } from "../../model/BookingInterface";
import { mongoConnect } from "../../databases/mongo-repository";
import { faker } from "@faker-js/faker/locale/es";
import { Room } from "../../model/RoomInterface";

async function seedDB() {
  try {
    await mongoConnect();
    console.log("Connected correctly to server");

    const rooms = await Room.find();

    if (!rooms.length) {
      console.error("No rooms found");
      return;
    }

    await Booking.collection.drop();
    console.log("Bookings deleted successfully");

    for (let i = 0; i < 15; i++) {
      const fullName = faker.person.fullName();
      const checkIn = faker.date.soon({ days: 365, refDate: "2024-01-01" });
      const checkOut = faker.date.soon({
        days: 30,
        refDate: new Date(checkIn),
      });
      const document = new Booking({
        name: fullName,
        orderDate: faker.date
          .past({ years: 1, refDate: checkIn })
          .toLocaleDateString("en-CA")
          .replace(/\//g, "-"),
        phone: faker.phone.number().replace(/\D/g, ""),
        check_in: checkIn.toLocaleDateString("en-CA"),
        hour_in: faker.date.soon().toLocaleTimeString(),
        check_out: checkOut.toLocaleDateString("en-CA"),
        hour_out: faker.date.soon().toLocaleTimeString(),
        room: rooms[i],
        specialRequest: faker.lorem.paragraph(2),
        status: "Check In",
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
