import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('auth_token');
      Cookies.remove('refresh_token');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    // Handle other errors
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else if (error.message) {
      toast.error(error.message);
    }

    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  },

  logout: async () => {
    await api.post('/api/auth/logout');
    Cookies.remove('auth_token');
    Cookies.remove('refresh_token');
  },

  getProfile: async () => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },
};

// Projects API functions
export const projectsAPI = {
  getAll: async () => {
    const response = await api.get('/api/projects');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get(`/api/projects/${id}`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/api/projects', data);
    return response.data;
  },

  update: async (id: number, data: any) => {
    const response = await api.put(`/api/projects/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/api/projects/${id}`);
    return response.data;
  },
};

// Buildings API functions
export const buildingsAPI = {
  getAll: async (projectId?: number) => {
    const params = projectId ? { projectId } : {};
    const response = await api.get('/api/buildings', { params });
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get(`/api/buildings/${id}`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/api/buildings', data);
    return response.data;
  },

  update: async (id: number, data: any) => {
    const response = await api.put(`/api/buildings/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/api/buildings/${id}`);
    return response.data;
  },
};

// Units API functions
export const unitsAPI = {
  getAll: async (buildingId?: number, projectId?: number) => {
    const params: any = {};
    if (buildingId) params.buildingId = buildingId;
    if (projectId) params.projectId = projectId;
    
    const response = await api.get('/api/units', { params });
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get(`/api/units/${id}`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/api/units', data);
    return response.data;
  },

  update: async (id: number, data: any) => {
    const response = await api.put(`/api/units/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/api/units/${id}`);
    return response.data;
  },
};

// Grid API functions
export const gridAPI = {
  getGridData: async (buildingId: number) => {
    const response = await api.get(`/api/grid/${buildingId}`);
    return response.data;
  },

  lockUnit: async (unitId: number, notes?: string) => {
    const response = await api.post(`/api/grid/lock/${unitId}`, { notes });
    return response.data;
  },

  unlockUnit: async (lockId: number) => {
    const response = await api.post(`/api/grid/unlock/${lockId}`);
    return response.data;
  },

  reserveUnit: async (unitId: number, data: any) => {
    const response = await api.post(`/api/grid/reserve/${unitId}`, data);
    return response.data;
  },
};

// Price Lists API functions
export const priceListsAPI = {
  getAll: async () => {
    const response = await api.get('/api/pricelists');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get(`/api/pricelists/${id}`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/api/pricelists', data);
    return response.data;
  },

  update: async (id: number, data: any) => {
    const response = await api.put(`/api/pricelists/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/api/pricelists/${id}`);
    return response.data;
  },

  publish: async (id: number) => {
    const response = await api.post(`/api/pricelists/${id}/publish`);
    return response.data;
  },

  close: async (id: number) => {
    const response = await api.post(`/api/pricelists/${id}/close`);
    return response.data;
  },

  assignAgency: async (id: number, agencyId: number) => {
    const response = await api.post(`/api/pricelists/${id}/assign-agency`, { agencyId });
    return response.data;
  },
};

// Reports API functions
export const reportsAPI = {
  getSalesReport: async (params: any) => {
    const response = await api.get('/api/reports/sales', { params });
    return response.data;
  },

  getOccupancyReport: async (params: any) => {
    const response = await api.get('/api/reports/occupancy', { params });
    return response.data;
  },

  getRevenueReport: async (params: any) => {
    const response = await api.get('/api/reports/revenue', { params });
    return response.data;
  },
};

// Audit API functions
export const auditAPI = {
  getAuditLogs: async (params: any) => {
    const response = await api.get('/api/audit', { params });
    return response.data;
  },
};
