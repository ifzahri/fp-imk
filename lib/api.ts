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
