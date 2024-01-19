import { faker } from "@faker-js/faker/locale/es";
import { sqlQuery } from "../../databases/sql";

async function seedDB() {
  try {
    await sqlQuery(
      "CREATE TABLE IF NOT EXISTS rooms (id INT AUTO_INCREMENT NOT NULL, photos JSON NOT NULL, roomType TINYTEXT NOT NULL, roomNumber TINYTEXT NOT NULL, description MEDIUMTEXT NOT NULL, offer VARCHAR(10) NOT NULL, priceNight FLOAT(2) NOT NULL, discount INT, cancellation TINYTEXT NOT NULL, amenities JSON NOT NULL, status VARCHAR(100) NOT NULL, PRIMARY KEY(id));"
    );

    await sqlQuery("DELETE FROM rooms");

    for (let i = 0; i < 15; i++) {
      const offer = faker.helpers.arrayElement(["YES", "NO"]);

      await sqlQuery(
        "INSERT INTO rooms (photos, roomType, roomNumber, description, offer, priceNight, discount , cancellation, amenities, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
          [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
          "Available",
        ]
      );
    }
  } catch (err) {
    console.log(err);
  }
}

seedDB();
