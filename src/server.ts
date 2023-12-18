import { app } from "./app";
import { configureRoutes } from "./controllers/index";
const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

configureRoutes(app)