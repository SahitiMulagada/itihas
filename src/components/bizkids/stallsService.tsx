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

export interface Review {
  rvw_id: string;
  evnt_id: string;
  stl_id: string;
  usr_id: string;
  rvw_ts: string;
  usr_nm: string;
  usr_imge_url_tx: string;
  rvw_ct: number;
  rvw_tx: string;
}

export interface EventReview {
    rvw_id: string;
    evnt_id: string;
    usr_id: string;
    rvw_ts: string;
    usr_nm: string;
    usr_imge_url_tx: string;
    rvw_ct: number;
    rvw_tx: string;
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

  async getEventReviews(eventId: string): Promise<EventReview[]> {
    try {
      const response = await service.get(`itihas/event/${eventId}/reviews`);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching event reviews:', error);
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

  async getStallReviews(stallId: string): Promise<Review[]> {
    try {
      const response = await service.get(`itihas/stall/${stallId}/reviews`);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching stall reviews:', error);
      throw error;
    }
  }

  async submitReview(stallId: string, review: Omit<Review, 'rvw_id' | 'rvw_ts'>): Promise<Review> {
    try {
      const response = await service.post(`itihas/stall/${stallId}/reviews`, review);
      return response.data;
    } catch (error) {
      console.error('Error submitting review:', error);
      throw error;
    }
  }
}

export const stallsService = new StallsService();
