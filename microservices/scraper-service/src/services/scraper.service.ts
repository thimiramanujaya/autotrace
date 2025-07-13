import axios from "axios";
import * as cheerio from "cheerio";
import { Listing } from "../types";
import { ListingService } from "./listing.service";
import { v4 as uuidv4 } from "uuid";

export class ScraperService {
  private listingService: ListingService;
  constructor(service: ListingService) {
    this.listingService = service;
  }

  async scrapePage(url: string): Promise<cheerio.CheerioAPI> {
    try {
      const response = await axios.get(url);
      if (!response.data) {
        throw new Error(`Empty response received from ${url}`);
      }
      return cheerio.load(response.data);
    } catch (err) {
      console.error(err);
      throw new Error(`Failed to fetch or parse page at ${url}`);
    }
  }

  processScrapedData($: cheerio.CheerioAPI): Omit<Listing, "id" | "createdAt" | "updatedAt"> {
    try {
      const title = $("h1.listing-title").text().trim();
      const vin = $("span.vin").text().trim();
      const mileage = parseInt(
        $("span.mileage")
          .text()
          .trim()
          .replace(/[^0-9]/g, ""),
        10,
      );
      const price = parseFloat(
        $("span.price")
          .text()
          .trim()
          .replace(/[^0-9.-]+/g, ""),
      );
      const description = $("div.description").text().trim();
      return { title, vin, mileage, price, description };
    } catch (err) {
      throw new Error("Failed to process scraped data");
    }
  }

  // optional: save the scraped listing to database
  async saveScrapedListing(data: Omit<Listing, "id" | "createdAt" | "updatedAt">) {
    await this.listingService.createListing({
      id: uuidv4(),
      ...data,
    });
  }
}
