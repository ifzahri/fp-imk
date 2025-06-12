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

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    is_verified: boolean;
  }