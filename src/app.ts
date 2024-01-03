import { configureRoutes } from "./controllers";
import express from 'express';
import serverless from 'serverless-http';



// Configuración del server
export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(404).send();
  });
  
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || 500).send();
  });

  
export const handler = serverless(app);
configureRoutes(app);