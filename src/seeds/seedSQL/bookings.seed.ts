import { faker } from "@faker-js/faker/locale/es";
import { sqlQuery } from "../../databases/sql";

async function seedDB() {
  try {
    await sqlQuery(
      "CREATE TABLE IF NOT EXISTS bookings (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, orderDate DATE NOT NULL, check_in DATE NOT NULL, hour_in TIME NOT NULL, check_out DATE NOT NULL, hour_out TIME NOT NULL, room_id INT NOT NULL, specialRequest LONGTEXT, status VARCHAR(100) NOT NULL, PRIMARY KEY(id), FOREIGN KEY(room_id) REFERENCES rooms(id));"
    );

    await sqlQuery("DELETE FROM bookings");

    const rows = await sqlQuery("SELECT id FROM rooms");
    console.log(rows)
    const rooms = rows.map((row: any) => row.id);

    for (let i = 0; i < 15; i++) {
      const fullName = faker.person.fullName();
      const checkIn = faker.date.soon({ days: 365, refDate: "2024-01-01" });
      const checkOut = faker.date.soon({
        days: 30,
        refDate: new Date(checkIn),
      });

      const indexAL = Math.floor(Math.random() * rooms.length);
      const idRoom = rooms[indexAL];
      rooms.splice(indexAL, 1);

      await sqlQuery(
        "INSERT INTO bookings (name, orderDate, check_in, hour_in, check_out, hour_out, room_id, specialRequest, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          fullName,
          faker.date
            .past({ years: 1, refDate: checkIn })
            .toLocaleDateString("en-CA")
            .replace(/\//g, "-"),
          checkIn.toLocaleDateString("en-CA"),
          faker.date.soon().toLocaleTimeString(),
          checkOut.toLocaleDateString("en-CA"),
          faker.date.soon().toLocaleTimeString(),
          idRoom,
          faker.lorem.paragraph(2),
          "Check In",
        ]
      );
    }
  } catch (err) {
    console.log(err);
  }
}

seedDB();
