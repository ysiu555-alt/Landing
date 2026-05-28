export type Language = "ru" | "en";

export type SubscriptionType = "TRIAL_3DAYS" | "WEEK_2" | "MONTH_1" | "LIFETIME" | "NONE";

export interface User {
  email: string;
  subscription_type: SubscriptionType;
  expires_at: string | null;
  hwid_bound?: boolean;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface MeResponse {
  email: string;
  subscription_type: SubscriptionType;
  expires_at: string | null;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  trial_granted: boolean;
}

export interface BuyResponse {
  success: boolean;
  pay_url?: string;
  message?: string;
}

export interface RedeemResponse {
  success: boolean;
  message: string;
  plan?: SubscriptionType;
  plan_name?: string;
}
