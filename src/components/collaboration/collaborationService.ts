interface PostGroup {
  pst_grp_id: string;
  pst_grp_nm: string;
  ctgry_nm?: string;
  sb_tx?: string;
  hndlr_tx: string;
  sqnce_id: number;
  icn_tx?: string;
  clr_cd?: string;
}

const menuItems: PostGroup[] = [
  {
    pst_grp_id: '1',
    pst_grp_nm: 'Public Events',
    ctgry_nm: 'Main Events',
    hndlr_tx: 'public_events',
    sqnce_id: 1,
    icn_tx: 'calendar',
    clr_cd: '#4F46E5'
  },
  {
    pst_grp_id: '2',
    pst_grp_nm: 'LPS Events',
    ctgry_nm: 'Main Events',
    hndlr_tx: 'lps_events',
    sqnce_id: 2,
    icn_tx: 'star',
    clr_cd: '#10B981'
  },
  {
    pst_grp_id: '3',
    pst_grp_nm: 'Gramasabha',
    ctgry_nm: 'Special Events',
    hndlr_tx: 'gramasabha',
    sqnce_id: 3,
    icn_tx: 'users',
    clr_cd: '#F59E0B'
  },
  {
    pst_grp_id: '4',
    pst_grp_nm: 'LPS Lottery',
    ctgry_nm: 'Special Events',
    hndlr_tx: 'lps_lottery',
    sqnce_id: 4,
    icn_tx: 'ticket',
    clr_cd: '#EC4899'
  }
];

import { Post } from './types';

export async function getAllPosts(): Promise<Post[]> {
  try {
    // First get all groups
    const groups = await getPostGroups();
    
    // Then fetch posts from each group
    const allPostsPromises = groups.map(group => getPostsByGroup(group.pst_grp_id));
    const postsArrays = await Promise.all(allPostsPromises);
    
    // Flatten the array of arrays into a single array of posts
    return postsArrays.flat();
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
}

export async function getPostsByGroup(groupId: string): Promise<Post[]> {
  try {
    // This is a mock implementation. Replace with actual API call.
    return [];
  } catch (error) {
    console.error(`Error fetching posts for group ${groupId}:`, error);
    return [];
  }
}

export async function getPostGroups(): Promise<PostGroup[]> {
  return [...menuItems].sort((a, b) => a.sqnce_id - b.sqnce_id);
}

export const collaborationService = {
  getMenuItems: () => {
    return [...menuItems].sort((a, b) => a.sqnce_id - b.sqnce_id);
  },
  getAllPosts,
  getPostsByGroup,
  getPostGroups
};

export type { PostGroup };
