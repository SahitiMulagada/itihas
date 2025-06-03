interface ApiResponse<T> {
  status: number;
  message: string | null;
  data: T;
  errors: string[];
}

interface Class {
  cls_id: number;
  cls_cd: string;
  cls_nm: string | null;
}

interface Category {
  ctgry_id: number;
  ctgry_nm: string;
}

interface RegistrationData {
  childName: string;
  dateOfBirth: string;
  school: string;
  class: string;
  flatNo: string;
  email: string;
  personalNote?: string;
  stallName?: string;
  stallDescription?: string;
  category?: string;
  otherNotes?: string;
  paymentScreenshot?: File;
}

const API_BASE_URL = 'http://localhost:4901/apiv1/itihas';

export const getStallCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/stall-categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch stall categories');
    }
    const result: ApiResponse<Category[]> = await response.json();
    if (result.status === 200 && Array.isArray(result.data)) {
      return result.data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching stall categories:', error);
    throw error;
  }
};

export const getClasses = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/classes`);
    if (!response.ok) {
      throw new Error('Failed to fetch classes');
    }
    const result: ApiResponse<Class[]> = await response.json();
    if (result.status === 200 && Array.isArray(result.data)) {
      return result.data.map(cls => cls.cls_cd);
    }
    return [];
  } catch (error) {
    console.error('Error fetching classes:', error);
    throw error;
  }
};

export const registerBizkid = async (data: RegistrationData): Promise<ApiResponse<{ message: string }>> => {
  try {
    // Create FormData to handle file upload
    const formData = new FormData();
    
    // Add all non-file fields
    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'paymentScreenshot' && value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    // Add payment screenshot if exists
    if (data.paymentScreenshot) {
      formData.append('paymentScreenshot', data.paymentScreenshot);
    }

    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};
