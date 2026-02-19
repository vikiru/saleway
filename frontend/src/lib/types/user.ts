export interface EcommerceUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  dateJoined: string;
  lastLogin?: string;
  isSuperuser: boolean;
  isStaff: boolean;
  isActive: boolean;
}

export interface EcommerceUserCreate {
  clerkUserId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export interface EcommerceUserUpdate {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export interface UserResponse {
  success: boolean;
  data?: EcommerceUser;
  error?: string;
}

export interface UserProfileResponse {
  success: boolean;
  data?: UserProfile;
  error?: string;
}

export interface AuthResponse {
  success: boolean;
  data?: {
    user: EcommerceUser;
    token?: string;
  };
  error?: string;
}
