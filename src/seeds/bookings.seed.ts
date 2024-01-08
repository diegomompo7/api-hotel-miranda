import mongoose from "mongoose";
import {  Booking } from "../model/BookingInterface";
import { mongoConnect } from "../mongo-repository";
import { faker } from '@faker-js/faker/locale/es';
import { Room } from "../model/RoomInterface";


async function seedDB() {
    try {
        await mongoConnect()
        console.log("Connected correctly to server");

        const rooms = await Room.find()

        if(!rooms.length) {
            console.error("No rooms found")
            return
        }

        await Booking.collection.drop();
        console.log("Bookings deleted successfully");


        for (let i = 0; i < 15; i++) {
            const fullName = faker.person.fullName();
            const checkIn =  faker.date.past({ years: 1, refDate: '2024-01-31' }).toLocaleDateString() .replace(/\//g, '-')
            const checkOut = faker.date.soon({ days: 5, refDate: checkIn }).toLocaleDateString().replace(/\//g, '-')

            const document = new Booking({
                name: fullName,
                orderDate: new Date(Date.now()).toLocaleDateString().replace(/\//g, '-'),
                phone: faker.phone.number().replace(/\D/g, ''),
                check_in: checkIn,
                hour_in: faker.date.past().toLocaleTimeString(),
                check_out: checkOut,
                hour_out: faker.date.soon().toLocaleTimeString(),
                room: rooms[Math.floor(Math.random() * rooms.length-1)],
                specialRequest: faker.lorem.paragraph(2),
                status: "Check In"

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