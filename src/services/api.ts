// src/services/api.ts

const API_BASE_URL = "https://api.example.com/v1"; // Placeholder Base URL

interface RequestOptions {
  method: string;
  headers: Record<string, string>;
  body?: string;
}

// Placeholder for authentication token
let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

const getHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`; // Placeholder for actual auth header
  }
  return headers;
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    let errorMessage = `HTTP error ${response.status}: ${response.statusText}`;
    try {
      const errorBody = await response.json();
      errorMessage = errorBody.message || errorMessage; // Use server message if available
    } catch (e) {
      // Ignore if error body is not JSON or empty
    }
    throw new Error(errorMessage);
  }
  // Handle cases where response might be empty (e.g., 204 No Content)
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json() as Promise<T>;
  }
  return Promise.resolve(null as unknown as T); // Or handle as appropriate for non-JSON responses
};

export const apiService = {
  get: async <T>(endpoint: string, params?: Record<string, any>): Promise<T> => {
    let url = `${API_BASE_URL}${endpoint}`;
    if (params) {
      const queryParams = new URLSearchParams(params);
      url = `${url}?${queryParams.toString()}`;
    }
    const options: RequestOptions = {
      method: "GET",
      headers: getHeaders(),
    };
    const response = await fetch(url, options);
    return handleResponse<T>(response);
  },

  post: async <T, P>(endpoint: string, payload: P): Promise<T> => {
    const options: RequestOptions = {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    };
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    return handleResponse<T>(response);
  },

  put: async <T, P>(endpoint: string, payload: P): Promise<T> => {
    const options: RequestOptions = {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    };
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    return handleResponse<T>(response);
  },

  delete: async <T>(endpoint: string): Promise<T> => {
    const options: RequestOptions = {
      method: "DELETE",
      headers: getHeaders(),
    };
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    return handleResponse<T>(response);
  },

  patch: async <T, P>(endpoint: string, payload: P): Promise<T> => {
    const options: RequestOptions = {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    };
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    return handleResponse<T>(response);
  },
};

// Example usage (optional, for demonstration):
// interface User {
//   id: number;
//   name: string;
// }
//
// const fetchUsers = async () => {
//   try {
//     const users = await apiService.get<User[]>('/users');
//     console.log(users);
//   } catch (error) {
//     console.error('Failed to fetch users:', error);
//   }
// };
//
// const createUser = async (userData: { name: string }) => {
//   try {
//     const newUser = await apiService.post<User, { name: string }>('/users', userData);
//     console.log(newUser);
//   } catch (error) {
//     console.error('Failed to create user:', error);
//   }
// };
