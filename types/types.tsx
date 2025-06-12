interface APIResponse<T> {
    status: boolean;
    message: string;
    data: T;
    meta?: {
        page: number;
        per_page: number;
        max_page: number;
        count: number;
    };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  is_verified: boolean;
}

export interface LoginResponse {
  token: string;
  role: 'admin' | 'user';
}