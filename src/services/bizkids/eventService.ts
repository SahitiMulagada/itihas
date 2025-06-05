interface Event {
  evnt_id: number;
  evnt_nm: string;
  dscn_tx: string;
  strt_dt: string;
  end_dt: string;
  act_strt_dt: string;
  act_end_dt: string;
  lcn_tx: string;
  rgtn_end_dt: string;
  bnr_url_tx: string;
  lgo_url_tx: string;
  pymt_qr_tx: string;
  pstr1_url_tx: string | null;
  pstr2_url_tx: string | null;
  pstr3_url_tx: string | null;
  cntct_nte_tx: string | null;
  cntct_tx: string | null;
  fnce_in: number;
  rgtn_fee_at: number;
  glry_in: number;
  orgn_tm_in: number;
  hndlr_tx: string;
}

interface ApiResponse<T> {
  status: number;
  message: string | null;
  data: T;
  errors: string[];
}

const API_BASE_URL = 'http://localhost:4901/apiv1/itihas';

const normalizeImagePath = (path: string | null): string => {
  if (!path) return '';
  return path.startsWith('/') ? path : `/${path}`;
};

export const getEventDetails = async (eventHandler: string): Promise<Event | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${eventHandler}`);
    if (!response.ok) {
      throw new Error('Failed to fetch event details');
    }
    const result: ApiResponse<Event[]> = await response.json();
    if (result.status === 200 && Array.isArray(result.data) && result.data.length > 0) {
      const event = result.data[0];
      // Normalize image paths
      return {
        ...event,
        bnr_url_tx: normalizeImagePath(event.bnr_url_tx),
        lgo_url_tx: normalizeImagePath(event.lgo_url_tx),
        pymt_qr_tx: normalizeImagePath(event.pymt_qr_tx),
        pstr1_url_tx: normalizeImagePath(event.pstr1_url_tx),
        pstr2_url_tx: normalizeImagePath(event.pstr2_url_tx),
        pstr3_url_tx: normalizeImagePath(event.pstr3_url_tx)
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching event details:', error);
    throw error;
  }
};
