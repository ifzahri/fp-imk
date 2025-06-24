export interface APIResponse<T> {
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
  telp_number: string;
  role: 'admin' | 'user';
  image_url: string;
  is_verified: boolean;
}

export interface LoginResponse {
  token: string;
  role: 'admin' | 'user';
  user?: User;
}

// Carbon Dashboard Types
export interface CarbonDashboardResponse {
  daily_average: DailyAverageData;
  monthly_average: MonthlyAverageData;
  carbon_trend: {
    [key: string]: TrendData[];
  };
  emission_sources: EmissionSource[];
}

export interface DailyAverageData {
  value: number;
  percentage_change: number;
  comparison_period: string;
  is_increase: boolean;
}

export interface MonthlyAverageData {
  value: number;
  percentage_change: number;
  comparison_period: string;
  is_increase: boolean;
}

export interface TrendData {
  label: string;
  value: number;
}

export interface EmissionSource {
  source: string;
  display_name: string;
  value: number;
  percentage_change: number;
  is_increase: boolean;
  icon: string;
  category: string;
}

// Activity Types
export interface ActivityResponse {
  id: string;
  user_id: string;
  source: string;
  deskripsi: string;
  carbon_estimate: number;
  carbon_output: number;
  vehicle_details: VehicleDetailsResponse;
  electrical_details: ElectricalDetailsResponse;
  food_details: FoodDetailsResponse;
  created_at: string;
  updated_at: string;
}

export interface VehicleDetailsResponse {
  fuel_type: string;
  distance: number;
}

export interface ElectricalDetailsResponse {
  item: string;
  duration_usage: number;
}

export interface FoodDetailsResponse {
  food_item: string;
  weight: number;
}

// Badge Types
export interface BadgeResponse {
  id: string;
  name: string;
  description: string;
  icon_url: string;
  criteria: string;
  category: string;
  level: number;
  created_at: string;
  updated_at: string;
}

// Challenge Types
export interface Milestone {
  target: number;
  reward: string;
  is_achieved: boolean;
}

export interface ChallengeResponse {
  id: string;
  nama: string;
  deskripsi: string;
  carbon_saving_estimate: number;
  duration_days: number;
  status: string;
  is_daily: boolean;
  milestones: Milestone[];
  created_at: string;
  updated_at: string;
}

export interface UserChallengeResponse {
  id: string;
  user_id: string;
  challenge_id: string;
  challenge_name: string;
  challenge_description: string;
  current_progress: number;
  milestone_progress: Milestone[];
  last_reset_date: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}