import express, { json, Request, Response, Express } from "express";
import "express-async-errors";
import httpStatus from "http-status";

import { connectDb, disconnectDB } from "./database";

import bookRouter from "./routers/books-router";
import errorHandler from "./middlewares/error-middleware";

const app = express();

app.use(json());

async function init(): Promise<Express> {
  await connectDb();
  app
    .use(express.json())
    .get("/health", (_req, res) => res.send("OK!"))
    .get("/health", (req: Request, res: Response) => res.send(httpStatus.OK))
    .use(bookRouter)
    .use(errorHandler);
  return Promise.resolve(app);
}

async function close(): Promise<void> {
  await disconnectDB();
}

const port = +process.env.PORT || 5000;
init()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}.`);
    });
  })
  .catch((e) => {
    console.log(e);
    close();
  });
