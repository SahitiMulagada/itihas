export interface Stall {
  stl_id?: number;
  stl_nu: string;
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

export const registeredStalls: Stall[] = [
  {
    stl_id: 1,
    stl_nu: 'S1',
    stl_nm: 'Tech Innovators',
    entrepreneurs: [{ mbr_id: 1, mbr_nm: 'Sahiti Mulagada', schl_nm: 'Meridian School', blk_nu: 'J' }],
    categories: [{ cat_id: 1, cat_nm: 'Technology' }, { cat_id: 2, cat_nm: 'Innovation' }]
  },
  {
    stl_id: 2,
    stl_nu: 'S2',
    entrepreneurs: [{ mbr_id: 2, mbr_nm: 'Arya Reddy', schl_nm: 'DPS School', blk_nu: 'K' }],
    categories: [{ cat_id: 3, cat_nm: 'Food' }, { cat_id: 4, cat_nm: 'Beverages' }]
  },
  {
    stl_id: 3,
    stl_nu: 'S3',
    entrepreneurs: [{ mbr_id: 3, mbr_nm: 'V Advik Gupta', schl_nm: 'Glendale International School', blk_nu: 'I' }],
    categories: [{ cat_id: 5, cat_nm: 'Technology' }, { cat_id: 6, cat_nm: 'Games' }]
  },
  {
    stl_id: 4,
    stl_nu: 'S4',
    entrepreneurs: [{ mbr_id: 4, mbr_nm: 'Siddharth', schl_nm: 'Silveroaks international school', blk_nu: 'F' }],
    categories: [{ cat_id: 1, cat_nm: 'Arts & Crafts' }, { cat_id: 7, cat_nm: 'Stationery' }]
  },
  {
    stl_id: 5,
    stl_nu: 'S5',
    entrepreneurs: [{ mbr_id: 5, mbr_nm: 'Geetali Movva', schl_nm: 'FKS', blk_nu: 'K' }],
    categories: [{ cat_id: 3, cat_nm: 'Food' }, { cat_id: 8, cat_nm: 'Snacks' }]
  },
  {
    stl_id: 6,
    stl_nu: 'S6',
    entrepreneurs: [{ mbr_id: 6, mbr_nm: 'Swetcha Kommu', schl_nm: 'PM Shri Kendriya Vidyalaya, AFS B', blk_nu: 'H' }],
    categories: [{ cat_id: 6, cat_nm: 'Games' }, { cat_id: 9, cat_nm: 'Entertainment' }]
  },
  {
    stl_id: 7,
    stl_nu: 'S7',
    entrepreneurs: [{ mbr_id: 7, mbr_nm: 'B.Pragnika', schl_nm: 'Chirec International School', blk_nu: 'K' }],
    categories: [{ cat_id: 1, cat_nm: 'Arts & Crafts' }]
  },
  {
    stl_id: 8,
    stl_nu: 'S8',
    entrepreneurs: [{ mbr_id: 8, mbr_nm: 'KRISHNA BHARGAV', schl_nm: 'PHOENIX GREENS', blk_nu: 'I' }],
    categories: [{ cat_id: 5, cat_nm: 'Technology' }, { cat_id: 10, cat_nm: 'Education' }]
  },
  {
    stl_id: 9,
    stl_nu: 'S9',
    entrepreneurs: [{ mbr_id: 9, mbr_nm: 'Saanvi CH and Nandan Sriram CH', schl_nm: 'Vyasa School', blk_nu: 'P' }],
    categories: [{ cat_id: 3, cat_nm: 'Food' }, { cat_id: 11, cat_nm: 'Healthy Snacks' }]
  },
  {
    stl_id: 10,
    stl_nu: 'S10',
    entrepreneurs: [{ mbr_id: 10, mbr_nm: 'srishti,vismaya', schl_nm: 'Akshara International school', blk_nu: 'M' }],
    categories: [{ cat_id: 1, cat_nm: 'Arts & Crafts' }, { cat_id: 12, cat_nm: 'Jewelry' }]
  },
  {
    stl_id: 11,
    stl_nu: 'S11',
    entrepreneurs: [{ mbr_id: 11, mbr_nm: 'Aadya Sai', schl_nm: 'Oakridge International School', blk_nu: 'O' }],
    categories: [{ cat_id: 3, cat_nm: 'Food' }, { cat_id: 4, cat_nm: 'Beverages' }]
  },
  {
    stl_id: 12,
    stl_nu: 'S12',
    entrepreneurs: [{ mbr_id: 12, mbr_nm: 'Aarav Sharma', schl_nm: 'Gaudium School', blk_nu: 'G' }],
    categories: [{ cat_id: 5, cat_nm: 'Technology' }, { cat_id: 6, cat_nm: 'Games' }]
  },
  {
    stl_id: 13,
    stl_nu: 'S13',
    entrepreneurs: [{ mbr_id: 13, mbr_nm: 'Aarohi Reddy', schl_nm: 'Meridian School', blk_nu: 'J' }],
    categories: [{ cat_id: 1, cat_nm: 'Arts & Crafts' }, { cat_id: 12, cat_nm: 'Jewelry' }]
  },
  {
    stl_id: 14,
    stl_nu: 'S14',
    entrepreneurs: [{ mbr_id: 14, mbr_nm: 'Aayush Kumar', schl_nm: 'Delhi Public School', blk_nu: 'L' }],
    categories: [{ cat_id: 3, cat_nm: 'Food' }, { cat_id: 8, cat_nm: 'Snacks' }]
  },
  {
    stl_id: 15,
    stl_nu: 'S15',
    entrepreneurs: [{ mbr_id: 15, mbr_nm: 'Advaith Menon', schl_nm: 'Chirec International School', blk_nu: 'N' }],
    categories: [{ cat_id: 6, cat_nm: 'Games' }, { cat_id: 9, cat_nm: 'Entertainment' }]
  }
];
