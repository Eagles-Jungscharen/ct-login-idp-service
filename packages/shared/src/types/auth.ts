export interface LoginRequest {
  username: string;
  password: string;
  authentication_request_id: string;
}

export interface ErrorResponse {
  error?: string;
  message?: string;
  [key: string]: unknown;
}

export interface LoginResult {
  success: boolean;
  error?: string;
}
