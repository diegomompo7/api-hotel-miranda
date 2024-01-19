import { faker } from "@faker-js/faker/locale/es";
import { sqlQuery } from "../../databases/sql";

async function seedDB() {
  try {
    await sqlQuery(
      "CREATE TABLE  IF NOT EXISTS users (id INT AUTO_INCREMENT NOT NULL, photo LONGTEXT NOT NULL, fullName VARCHAR(255) NOT NULL, job VARCHAR(100) NOT NULL, email VARCHAR(255) NOT NULL, phone VARCHAR(9) NOT NULL, startDate DATE NOT NULL, descriptionJob LONGTEXT NOT NULL, status VARCHAR(10) NOT NULL, password VARCHAR(225) NOT NULL, PRIMARY KEY(id));"
    );

    await sqlQuery("DELETE FROM users");

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

      await sqlQuery(
        "INSERT INTO users (photo, fullName, job, email, phone, startDate, descriptionJob, status, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          faker.internet.avatar(),
          fullName,
          job,
          email,
          faker.phone.number().replace(/\D/g, ""),
          faker.date
            .past({ years: 1, refDate: "2024-01-02T00:00:00.000Z" })
            .toLocaleDateString("en-CA")
            .replace(/\//g, "-"),
          job,
          faker.helpers.arrayElement(["ACTIVE", "INACTIVE"]),
          faker.internet.password({ memorable: true }),
        ]
      );
    }
  } catch (err) {
    console.log(err);
  }
}

seedDB();
