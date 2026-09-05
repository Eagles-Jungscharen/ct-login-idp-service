import { appConfig } from '../config/appConfig';
import type { LoginRequest, LoginResult, ErrorResponse } from '../types/auth';

/**
 * Führt einen Login-Request zum Server durch
 * 
 * @param username - ChurchTools Benutzername
 * @param password - ChurchTools Passwort
 * @param authenticationRequestId - Authorization Request ID aus der URL
 * @returns LoginResult mit success/error
 */
export async function login(
  username: string,
  password: string,
  authenticationRequestId: string
): Promise<LoginResult> {
  const loginUrl = `${appConfig.loginServerUrl}/api/login`;

  const payload: LoginRequest = {
    username,
    password,
    authentication_request_id: authenticationRequestId,
  };

  try {
    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });
    if (response.ok) {
      const data = await response.json() as { callback?: string };
      if (data.callback) {
        window.location.href = data.callback;
      }
      return { success: true };
    }

    // Fehlerfall: Versuche die Fehlermeldung aus dem Response-Body zu lesen
    let errorMessage = `Login fehlgeschlagen (Status: ${response.status})`;
    
    try {
      const errorData: ErrorResponse = await response.json();
      errorMessage = errorData.error || errorData.message || errorMessage;
    } catch {
      // Wenn JSON-Parsing fehlschlägt, verwende die Standard-Fehlermeldung
      errorMessage = `Login fehlgeschlagen (Status: ${response.status})`;
    }

    return {
      success: false,
      error: errorMessage,
    };
  } catch (error) {
    // Netzwerkfehler oder andere unerwartete Fehler
    const errorMessage =
      error instanceof Error
        ? `Verbindungsfehler: ${error.message}`
        : 'Ein unerwarteter Fehler ist aufgetreten';

    return {
      success: false,
      error: errorMessage,
    };
  }
}
