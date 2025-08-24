import axios from 'axios';

// Create Axios instance with base URL from environment variables
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// JWT Token Management
const TOKEN_KEY = 'jwtToken';

export const setToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// Request interceptor to automatically attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and token management
api.interceptors.response.use(
  (response) => {
    // Return only the data payload for successful responses
    return response.data;
  },
  (error) => {
    // Handle token expiration or authentication errors
    if (error.response?.status === 401) {
      removeToken();
      // Optionally redirect to login page or show auth error
      console.log('Token expired or invalid. Please log in again.');
    }
    
    // Extract and standardize error messages
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error || 
                        error.message || 
                        'An unexpected error occurred';
    
    // Log error for debugging
    console.error('API Error:', {
      status: error.response?.status,
      message: errorMessage,
      url: error.config?.url,
    });
    
    // Return standardized error object
    return Promise.reject({
      status: error.response?.status,
      message: errorMessage,
      originalError: error,
    });
  }
);

// Authentication API methods
export const authAPI = {
  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.token) {
        setToken(response.token);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Register user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.token) {
        setToken(response.token);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Logout user
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      removeToken();
    }
  },

  // Get current user profile
  getProfile: async () => {
    try {
      return await api.get('/auth/profile');
    } catch (error) {
      throw error;
    }
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const response = await api.post('/auth/refresh');
      if (response.token) {
        setToken(response.token);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },
};

// User API methods
export const userAPI = {
  // Update user profile
  updateProfile: async (userData) => {
    try {
      return await api.put('/users/profile', userData);
    } catch (error) {
      throw error;
    }
  },

  // Get user by ID
  getUser: async (userId) => {
    try {
      return await api.get(`/users/${userId}`);
    } catch (error) {
      throw error;
    }
  },
};

// Events API methods
export const eventsAPI = {
  // Get all events
  getEvents: async (params = {}) => {
    try {
      return await api.get('/events', { params });
    } catch (error) {
      throw error;
    }
  },

  // Get single event
  getEvent: async (eventId) => {
    try {
      return await api.get(`/events/${eventId}`);
    } catch (error) {
      throw error;
    }
  },

  // Create new event
  createEvent: async (eventData) => {
    try {
      return await api.post('/events', eventData);
    } catch (error) {
      throw error;
    }
  },

  // Update event
  updateEvent: async (eventId, eventData) => {
    try {
      return await api.put(`/events/${eventId}`, eventData);
    } catch (error) {
      throw error;
    }
  },

  // Delete event
  deleteEvent: async (eventId) => {
    try {
      return await api.delete(`/events/${eventId}`);
    } catch (error) {
      throw error;
    }
  },
};

// Export the configured axios instance for direct use if needed
export default api; 