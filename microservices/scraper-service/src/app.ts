import express from 'express';
import dotenv from 'dotenv';
import { json, urlencoded } from 'express';
import { scrapeRoutes } from './routes';
import { errorHandler } from './middleware';

dotenv.config();

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/scrape-listing', scrapeRoutes);

app.use(errorHandler);

export default app;
