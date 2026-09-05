/**
 * Anwendungs-Konfiguration
 * Bietet typsicheren Zugriff auf Umgebungsvariablen
 */

interface AppConfig {
  loginServerUrl: string;
  appTitle: string;
  appDescription: string;
  backgroundImageUrl?: string;
}

/**
 * Lädt und validiert die Anwendungskonfiguration aus Umgebungsvariablen
 * @throws {Error} Wenn erforderliche Konfigurationsparameter fehlen
 */
function loadConfig(): AppConfig {
  const loginServerUrl = import.meta.env.VITE_LOGIN_SERVER_URL;
  const appTitle = import.meta.env.VITE_APP_TITLE;
  const appDescription = import.meta.env.VITE_APP_DESCRIPTION;
  const backgroundImageUrl = import.meta.env.VITE_BACKGROUND_IMAGE_URL;

  if (!loginServerUrl) {
    throw new Error('VITE_LOGIN_SERVER_URL ist nicht konfiguriert');
  }

  if (!appTitle) {
    throw new Error('VITE_APP_TITLE ist nicht konfiguriert');
  }

  if (!appDescription) {
    throw new Error('VITE_APP_DESCRIPTION ist nicht konfiguriert');
  }

  return {
    loginServerUrl: loginServerUrl.replace(/\/$/, ''), // Entfernt trailing slash
    appTitle,
    appDescription,
    backgroundImageUrl: backgroundImageUrl || undefined,
  };
}

/**
 * Zentrale Anwendungskonfiguration
 */
export const appConfig = loadConfig();
