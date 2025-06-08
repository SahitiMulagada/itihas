export interface Template {
  tmplt_id: string;
  tmplt_nm: string;
  dscn_tx?: string;
  sqnc_id: number;
  hndlr_tx: string;
  icn_tx?: string;
  clr_cd?: string;
  dflt_in: boolean;
  cntrl_tx: string; // 16-digit binary string
}

export interface PostInputProps {
  pst_grp_id: string;
  tmllts: Template[];
  onSubmit: (data: PostData) => void;
}

export interface PostData {
  pst_grp_id: string;
  tmplt_id: string;
  location?: string;
  dates?: {
    start: Date;
    end?: Date;
  };
  description?: string;
  images?: File[];
  videos?: File[];
  documents?: File[];
  embeddedContent?: string;
  tags?: string[];
  poll?: {
    question: string;
    options: string[];
  };
  htmlContent?: string;
  review?: {
    rating: number;
    text: string;
  };
  allowComments: boolean;
}

export interface PostProps {
  post: PostData;
  isExpanded?: boolean;
}

// Helper function to check if a control is enabled
export const isControlEnabled = (cntrl_tx: string, position: number): boolean => {
  if (position < 1 || position > 16) return false;
  return cntrl_tx.charAt(position - 1) === '1';
};
