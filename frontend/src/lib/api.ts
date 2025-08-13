import axios from 'axios';
import { ChecklistSummary, ApiError } from '@/types/checklist.types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data) {
      // Return the error data as ApiError
      return Promise.reject(error.response.data as ApiError);
    }
    return Promise.reject(error);
  }
);

export const checklistsApi = {
  getAll: async (): Promise<ChecklistSummary[]> => {
    const response = await apiClient.get('/api/checklists');
    return response.data;
  },
};
