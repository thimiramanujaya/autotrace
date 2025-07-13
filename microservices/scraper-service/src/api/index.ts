import { Router } from "express";
import { scrapeRoutes } from "./routes";

const router = Router();

router.use("/scrape-listing", scrapeRoutes);

export default router;
