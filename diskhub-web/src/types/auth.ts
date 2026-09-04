export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarColor?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
  token?: string;
  error?: string;
}
