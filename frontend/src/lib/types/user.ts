export interface EcommerceUser {
  id: number;
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
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface EcommerceUserUpdate {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserProfile {
  id: number;
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
