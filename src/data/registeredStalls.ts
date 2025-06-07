export interface Stall {
  stl_id?: number;
  stl_nu: string | null;
  stl_nm?: string;
  entrepreneurs: {
    mbr_id?: number;
    mbr_nm: string;
    schl_nm: string;
    blk_nu: string;
  }[];
  categories: {
    cat_id?: number;
    cat_nm: string;
  }[];
}

// Note: This file only contains type definitions.
// The actual stall data is fetched from the API using stallsService.getStalls()
