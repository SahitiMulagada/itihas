// This file contains static stall data for build-time generation
export interface Stall {
  stl_id: number;
  stl_nu: string | null;
  stl_nm: string;
  entrepreneurs: {
    mbr_id: number;
    mbr_nm: string;
    schl_nm: string;
    blk_nu: string;
  }[];
  categories: {
    ctgry_id: number;
    ctgry_nm: string;
  }[];
}

