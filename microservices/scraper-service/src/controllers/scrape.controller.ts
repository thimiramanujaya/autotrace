import { Request, Response, NextFunction } from 'express';
import { ScraperService, ListingService } from '../services';

export class ScrapeController {

  private scraperService: ScraperService;

  constructor() {
    this.scraperService = new ScraperService(new ListingService());
  }
  async scrapeListing(req: Request, res: Response, next: NextFunction) {
    try {
    const { url } = req.body;

    const html = await this.scraperService.scrapePage(url);
    const listing = this.scraperService.processScrapedData(html);
    // await this.scraperService.saveScrapedListing(listing);

    res.status(200).json({ success: true, data: listing });
    
    } catch (error) {
      next(error);
    }
  } 
}