import { Router } from "express";
import { ScrapeController } from "../controllers";
import { validateRequest } from "../../../../shared/src/middleware";
import { scrapeRequestSchema } from "../../validators/schemas";

const router = Router();
const scrapeController = new ScrapeController();

router.post(
  "/",
  validateRequest(scrapeRequestSchema),
  scrapeController.scrapeListing.bind(scrapeController),
);

export default router;
