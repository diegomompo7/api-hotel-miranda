import { faker } from "@faker-js/faker/locale/es";
import { sqlQuery } from "../../databases/sql";

async function seedDB() {
  try {
    await sqlQuery(
      "CREATE TABLE IF NOT EXISTS rooms (id INT AUTO_INCREMENT NOT NULL, photos JSON NOT NULL, roomType TINYTEXT NOT NULL, roomNumber TINYTEXT NOT NULL, description MEDIUMTEXT NOT NULL, offer VARCHAR(10) NOT NULL, priceNight FLOAT(2) NOT NULL, discount INT, cancellation TINYTEXT NOT NULL, status VARCHAR(100) NOT NULL, PRIMARY KEY(id));"
    );

    await sqlQuery(
      "CREATE TABLE IF NOT EXISTS amenities (id INT AUTO_INCREMENT NOT NULL, amenity VARCHAR(255) NOT NULL,  room_id INT NOT NULL, PRIMARY KEY(id), FOREIGN KEY(room_id) REFERENCES rooms(id));"
    );

    await sqlQuery("DELETE FROM rooms");
    await sqlQuery("DELETE FROM amenities");

    for (let i = 0; i < 15; i++) {
      const offer = faker.helpers.arrayElement(["YES", "NO"]);

      const roomInsertResult = await sqlQuery(
        "INSERT INTO rooms (photos, roomType, roomNumber, description, offer, priceNight, discount , cancellation, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          [
            faker.image.urlLoremFlickr({ category: "hotel,bedroom" }),
            faker.image.urlLoremFlickr({ category: "hotel,bedroom" }),
            faker.image.urlLoremFlickr({
              category: "hotel,bedroom",
            }),
          ],
          faker.helpers.arrayElement([
            "Single Bed",
            "Double Bed",
            "Double Superior",
            "Suite",
          ]),
          faker.lorem.word() + "-" + faker.number.int({ max: 500 }),
          faker.lorem.paragraph(2),
          offer,
          faker.commerce.price({ min: 50, max: 300, dec: 2 }),
          offer === "YES" ? faker.number.int({ min: 10, max: 50 }) : null,
          faker.lorem.paragraph(2),
          "Available",
        ]
      );

      const roomId = roomInsertResult.insertId
      

        for(let i=0; i<5; i++){
      await sqlQuery(
       `INSERT INTO amenities (amenity, room_id)
        VALUES (?,?)`,  [faker.lorem.word(), roomId]
      )
        }
    }
  } catch (err) {
    console.log(err);
  }
}

seedDB();
