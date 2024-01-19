import express, { Request, Response } from "express";

export const publicRouter = express.Router();

publicRouter.get("/", (_req: Request, res: Response) => {
  res.json({
    name: "Hotel Miranda",
    endpoints: {
      "/login": ["GET LOGIN", "POST LOGIN"],
      "/rooms": ["GET ROOMS", "POST ROOM", "PATCH ROOM", "DELETE ROOM"],
      "/bookings": [
        "GET BOOKINGS",
        "POST BOOKING",
        "PATCH BOOKING",
        "DELETE BOOKING",
      ],
      "/bookings/:id": ["GET BOOKING ID"],
      "/contact": [
        "GET CONTACTS",
        "POST CONTACT",
        "PATCH CONTACT",
        "DELETE CONTACT",
      ],
      "/users": ["GET USERS", "POST USER", "PATCH USER", "DELETE USER"],
      "/header": ["GET USER LOGGED"],
    },
  });
});
