// Typen werden aus dem shared Package re-exportiert
export type { LoginRequest, ErrorRecord, LoginResult } from '@ct-login-idp-service/shared';

export interface LoginActionResult {
    success: boolean;
    error?: string;
}
