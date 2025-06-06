import service from '@/app/store/baseapiservice';

export interface Entrepreneur {
  mbr_id: number;
  mbr_nm: string;
  schl_nm: string;
  blk_nu: string;
}

export interface Category {
  ctgry_id: number;
  ctgry_nm: string;
}

export interface Stall {
  stl_id: number;
  stl_nu: string | null;
  stl_nm: string;
  lgo_url_tx: string | null;
  categories: Category[];
  entrepreneurs: Entrepreneur[];
}

class StallsService {
  async getStalls(): Promise<Stall[]> {
    try {
      const response = await service.get('itihas/stalls');
      console.log(response.data);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching stalls:', error);
      throw error;
    }
  }

  async getStallById(id: number): Promise<Stall | null> {
    try {
      const response = await service.get(`itihas/stall/${id}`);
      return response.data || null;
    } catch (error) {
      console.error(`Error fetching stall ${id}:`, error);
      throw error;
    }
  }
}

export const stallsService = new StallsService();
