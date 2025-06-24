// lib/api.ts
import api from './axios'
import type { 
  APIResponse, 
  User, 
  LoginResponse, 
  CarbonDashboardResponse,
  ActivityResponse,
  BadgeResponse,
  ChallengeResponse,
  UserChallengeResponse
} from '../types/types'

// -- AUTH / USER --
export const loginUser = async (email: string, password: string) => {
  const response = await api.post<APIResponse<LoginResponse>>('/user/login', { email, password })
  return response.data
}

export const registerUser = async (name: string, email: string, password: string, telp_number: string) => {
  const response = await api.post<APIResponse<User>>('/user', { name, email, telp_number, password })
  return response.data
}

export const getUsers = async () => {
  const response = await api.get<APIResponse<User[]>>('/user')
  return response.data
}

export const getCurrentUserProfile = async () => {
  const response = await api.get<APIResponse<User>>('/user/me')
  return response.data
}

export const updateUserProfile = async (payload: {
  name?: string
  email?: string
  telp_number?: string
}) => {
  const response = await api.patch<APIResponse<User>>('/user', payload)
  return response.data
}

export const deleteUser = async () => {
  const response = await api.delete<APIResponse<unknown>>('/user')
  return response.data
}

// -- ACTIVITY (Carbon entries) --
export interface CarbonEntryData {
  user_id: string
  source: 'vehicle' | 'electronics' | 'food'
  deskripsi: string
  vehicle_details: { fuel_type: string; distance: number }
  electrical_details: { item: string; duration_usage: number }
  food_details: { food_item: string; weight: number }
}

export const addActivity = async (entry: CarbonEntryData) => {
  const response = await api.post<APIResponse<ActivityResponse>>('/activity/', entry)
  return response.data
}

export const getActivityById = async (id: string) => {
  const response = await api.get<APIResponse<ActivityResponse>>(`/activity/${id}`)
  return response.data
}

export const getAllActivities = async () => {
  const response = await api.get<APIResponse<ActivityResponse[]>>('/activity')
  return response.data
}

export const getActivitiesByUser = async (userId: string) => {
  const response = await api.get<APIResponse<ActivityResponse[]>>(`/activity/user/${userId}`)
  return response.data
}

export const updateActivity = async (id: string, entry: Partial<CarbonEntryData>) => {
  const response = await api.put<APIResponse<ActivityResponse>>(`/activity/${id}`, entry)
  return response.data
}

export const deleteActivity = async (id: string) => {
  const response = await api.delete<APIResponse<unknown>>(`/activity/${id}`)
  return response.data
}

// -- CARBON DASHBOARD --
export const getCarbonDashboard = async (queryParams?: string) => {
  const url = queryParams ? `/carbon/dashboard${queryParams}` : '/carbon/dashboard'
  const response = await api.get<APIResponse<CarbonDashboardResponse>>(url)
  return response.data
}

export const getDailyAverage = async () => {
  const response = await api.get<APIResponse<any>>('/carbon/daily_average')
  return response.data
}

export const getMonthlyAverage = async () => {
  const response = await api.get<APIResponse<any>>('/carbon/monthly_average')
  return response.data
}

export const getTotalBySource = async () => {
  const response = await api.get<APIResponse<any>>('/carbon/total_by_source')
  return response.data
}

// -- BADGES --
export const createBadge = async (badge: {
  name: string
  description: string
  icon_url: string
  criteria: string
  category: string
  level: number
}) => {
  const response = await api.post<APIResponse<BadgeResponse>>('/badge', badge)
  return response.data
}

export const getBadgeById = async (id: string) => {
  const response = await api.get<APIResponse<BadgeResponse>>(`/badge/${id}`)
  return response.data
}

export const getAllBadges = async () => {
  const response = await api.get<APIResponse<BadgeResponse[]>>('/badge/')
  return response.data
}

export const getUserBadges = async (userId: string) => {
  const response = await api.get<APIResponse<BadgeResponse[]>>(`/badge/user/${userId}`)
  return response.data
}

export const updateBadge = async (id: string, badge: Partial<{
  name: string
  description: string
  icon_url: string
  criteria: string
  category: string
  level: number
}>) => {
  const response = await api.put<APIResponse<BadgeResponse>>(`/badge/${id}`, badge)
  return response.data
}

export const deleteBadge = async (id: string) => {
  const response = await api.delete<APIResponse<unknown>>(`/badge/${id}`)
  return response.data
}

// -- CHALLENGES --
export const createChallenge = async (challenge: {
  nama: string
  deskripsi: string
  carbon_saving_estimate: number
  duration_days: number
  status?: string
  is_daily: boolean
  milestones: Array<{ target: number; reward: string; is_achieved: boolean }>
}) => {
  const response = await api.post<APIResponse<ChallengeResponse>>('/challenge', challenge)
  return response.data
}

export const getAllChallenges = async () => {
  const response = await api.get<APIResponse<ChallengeResponse[]>>('/challenge')
  return response.data
}

export const getChallengeById = async (id: string) => {
  const response = await api.get<APIResponse<ChallengeResponse>>(`/challenge/${id}`)
  return response.data
}

export const updateChallenge = async (id: string, challenge: Partial<{
  nama: string
  deskripsi: string
  carbon_saving_estimate: number
  duration_days: number
  status: string
  is_daily: boolean
  milestones: Array<{ target: number; reward: string; is_achieved: boolean }>
}>) => {
  const response = await api.patch<APIResponse<ChallengeResponse>>(`/challenge/${id}`, challenge)
  return response.data
}

export const deleteChallenge = async (id: string) => {
  const response = await api.delete<APIResponse<unknown>>(`/challenge/${id}`)
  return response.data
}

export const getUserDailyChallenge = async () => {
  const response = await api.get<APIResponse<UserChallengeResponse>>('/challenge/daily')
  return response.data
}

export const updateUserChallengeProgress = async (challengeId: string, progress: number) => {
  const response = await api.put<APIResponse<UserChallengeResponse>>(`/challenge/${challengeId}/progress`, { progress })
  return response.data
}

// Legacy exports for backward compatibility
export const addCarbonEntry = addActivity
export { type CarbonEntryData }
