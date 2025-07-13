import { ListingModel } from "../models";
import { Listing } from "../types";

export class ListingService {
  private readonly model: typeof ListingModel;

  constructor() {
    this.model = ListingModel;
  }

  async getListingById(id: string): Promise<Listing | null> {
    return this.model.get(id);
  }

  async createListing(data: Omit<Listing, "createdAt" | "updatedAt">): Promise<void> {
    if (!data.id || !data.vin || !data.title) {
      throw new Error("Missing required listing fields");
    }
    return this.model.create(data);
  }

  async getRecentListings(limit = 20): Promise<Listing[]> {
    return this.model.list(limit);
  }
}
