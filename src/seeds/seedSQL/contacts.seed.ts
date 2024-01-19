import { faker } from "@faker-js/faker/locale/es";
import { sqlQuery } from "../../databases/sql";

async function seedDB() {
  try {
    await sqlQuery(
      "CREATE TABLE IF NOT EXISTS contacts (id INT AUTO_INCREMENT NOT NULL, userImg LONGTEXT NOT NULL, name VARCHAR(100) NOT NULL, surname VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, phone VARCHAR(50) NOT NULL, date DATE NOT NULL, subject VARCHAR(100) NOT NULL, message LONGTEXT NOT NULL, starts INT NOT NULL, is_archived BOOLEAN NOT NULL, PRIMARY KEY(id));"
    );

    await sqlQuery("DELETE FROM contacts");

    for (let i = 0; i < 15; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = faker.internet.email({
        firstName: firstName,
        lastName: lastName,
      });

      await sqlQuery(
        "INSERT INTO contacts (userImg, name, surname, email, phone, date, subject, message, starts, is_archived) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          faker.image.avatar(),
          firstName,
          lastName,
          email,
          faker.phone.number().replace(/\D/g, ""),
          faker.date
            .past({ years: 1, refDate: "2024-01-02T00:00:00.000Z" })
            .toLocaleDateString("en-CA")
            .replace(/\//g, "-"),
          faker.lorem.sentence(5),
          faker.lorem.paragraph(2),
          faker.number.int({ min: 1, max: 5 }),
          false,
        ]
      );
    }
  } catch (err) {
    console.log(err);
  }
}

seedDB();
