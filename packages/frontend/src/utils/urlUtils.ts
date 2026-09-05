/**
 * Hilfsfunktionen für URL-Parameter-Extraktion
 */

/**
 * Extrahiert den authorization_request_id Parameter aus der aktuellen URL
 * 
 * @returns Der authorization_request_id Wert oder null wenn nicht vorhanden
 */
export function getAuthorizationRequestId(): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('authorization_request_id');
}

/**
 * Validiert, ob ein authorization_request_id vorhanden ist
 * 
 * @returns true wenn der Parameter vorhanden und nicht leer ist
 */
export function hasAuthorizationRequestId(): boolean {
  const id = getAuthorizationRequestId();
  return id !== null && id.trim().length > 0;
}
