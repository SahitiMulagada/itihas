import { type Template } from './types';

interface PostSettings {
  pst_grp_id: string;
  tmllts: Template[];
}

// Sample templates for different post groups
const postSettings: Record<string, PostSettings> = {
  '1': {
    pst_grp_id: '1',
    tmllts: [
      {
        tmplt_id: '1',
        tmplt_nm: 'Event Announcement',
        dscn_tx: 'Create a new public event announcement',
        sqnc_id: 1,
        hndlr_tx: 'event_announcement',
        icn_tx: 'calendar',
        clr_cd: '#4F46E5',
        dflt_in: true,
        cntrl_tx: '1111111100000000' // Location, Dates, Description, Images, Videos, Documents, Embedded, Tags
      },
      {
        tmplt_id: '2',
        tmplt_nm: 'Event Report',
        dscn_tx: 'Create a report for a completed event',
        sqnc_id: 2,
        hndlr_tx: 'event_report',
        icn_tx: 'document',
        clr_cd: '#4F46E5',
        dflt_in: false,
        cntrl_tx: '1011111110100000' // Location, Description, Images, Videos, Documents, Embedded, Tags, HTML
      }
    ]
  },
  '2': {
    pst_grp_id: '2',
    tmllts: [
      {
        tmplt_id: '3',
        tmplt_nm: 'LPS Event',
        dscn_tx: 'Create a new LPS event post',
        sqnc_id: 1,
        hndlr_tx: 'lps_event',
        icn_tx: 'star',
        clr_cd: '#10B981',
        dflt_in: true,
        cntrl_tx: '1111111111100000' // Location, Dates, Description, Images, Videos, Documents, Embedded, Tags, Poll, HTML
      }
    ]
  },
  '3': {
    pst_grp_id: '3',
    tmllts: [
      {
        tmplt_id: '4',
        tmplt_nm: 'Gramasabha Notice',
        dscn_tx: 'Create a new Gramasabha notice',
        sqnc_id: 1,
        hndlr_tx: 'gramasabha_notice',
        icn_tx: 'users',
        clr_cd: '#F59E0B',
        dflt_in: true,
        cntrl_tx: '1111110011100000' // Location, Dates, Description, Images, Videos, Documents, Poll, HTML
      }
    ]
  },
  '4': {
    pst_grp_id: '4',
    tmllts: [
      {
        tmplt_id: '5',
        tmplt_nm: 'Lottery Announcement',
        dscn_tx: 'Create a new lottery announcement',
        sqnc_id: 1,
        hndlr_tx: 'lottery_announcement',
        icn_tx: 'ticket',
        clr_cd: '#EC4899',
        dflt_in: true,
        cntrl_tx: '1110001111100000' // Location, Dates, Description, Tags, Poll, HTML
      },
      {
        tmplt_id: '6',
        tmplt_nm: 'Lottery Results',
        dscn_tx: 'Post lottery results',
        sqnc_id: 2,
        hndlr_tx: 'lottery_results',
        icn_tx: 'ticket',
        clr_cd: '#EC4899',
        dflt_in: false,
        cntrl_tx: '1000001110100000' // Location, Tags, Poll, HTML
      }
    ]
  }
};

export const postManagementService = {
  getPostSettings: (pst_grp_id: string): PostSettings | null => {
    return postSettings[pst_grp_id] || null;
  }
};
