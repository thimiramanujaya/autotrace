import express from "express";
import dotenv from "dotenv";
import { json, urlencoded } from "express";
import apiRouter from "./api";
import { errorHandler } from "../../shared/src/middleware";

dotenv.config();

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.use(errorHandler);

export default app;
