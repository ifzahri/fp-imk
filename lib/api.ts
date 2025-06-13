// lib/api.ts
import api from './axios'

export const loginUser = async (email: string, password: string) => {
  const response = await api.post('/user/login', { email, password })
  return response.data
}

export const registerUser = async (name: string, email: string, password: string) => {
  const response = await api.post('/user', { name, email, password })
  return response.data
}

export const getUsers = async () => {
  const response = await api.get('/user')
  return response.data
}

export const getCurrentUserProfile = async () => {
  const response = await api.get('/user/me');
  return response.data; // Or response.data.data if it's doubly wrapped
};

export interface CarbonEntryData {
  category: string;
  vehicleType?: string; // Optional, depends on category
  fuelType?: string;    // Optional
  distance?: string | number; // Optional
  date?: string;          // Optional
  notes?: string;         // Optional
  // ... add other fields if electronics/food forms were defined
}

export const addCarbonEntry = async (entryData: CarbonEntryData) => {
  // Replace with actual API call:
  // const response = await api.post('/carbon-entries', entryData);
  // return response.data;

  console.log("Placeholder: Adding carbon entry to backend", entryData);
  // Simulate a successful response for now
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  return { status: true, message: "Carbon entry added successfully (placeholder)", data: entryData };
};