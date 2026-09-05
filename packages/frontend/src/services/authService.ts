import { appConfig } from '../config/appConfig';
import type { LoginRequest, LoginResult, ErrorRecord, LoginActionResult } from '../types/auth';

/**
 * Führt einen Login-Request zum Server durch
 * 
 * @param username - ChurchTools Benutzername
 * @param password - ChurchTools Passwort
 * @param authenticationRequestId - Authorization Request ID aus der URL
 * @returns LoginResult mit success/error
 */
export const login = async (username: string, password: string, authenticationRequestId: string): Promise<LoginActionResult> => {
  const loginUrl = `${appConfig.loginServerUrl}/api/login`;

  const payload: LoginRequest = {
    username,
    password,
    authenticationRequestId,
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
      const data = await response.json() as LoginResult;
      if (data.callback) {
        window.location.href = data.callback;
      }
      return { success: true };
    }

    // Fehlerfall: Versuche die Fehlermeldung aus dem Response-Body zu lesen
    let errorMessage = `Login fehlgeschlagen (Status: ${response.status})`;

    try {
      const errorData: ErrorRecord = await response.json();
      errorMessage = errorData.error || errorMessage;
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
