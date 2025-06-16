import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getUserIdFromJwt(): string | null {
  if (typeof localStorage === 'undefined') {
    return null; // Cannot access localStorage on the server side
  }
  const authStorage = localStorage.getItem('auth-storage');
  if (!authStorage) {
    return null;
  }
  try {
    const authState = JSON.parse(authStorage);
    const token = authState?.state?.token;

    if (!token) {
      return null;
    }

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    const payload = JSON.parse(jsonPayload);
    return payload.user_id || null;
  } catch (error) {
    console.error("Failed to get user ID from local storage:", error);
    return null;
  }
}
