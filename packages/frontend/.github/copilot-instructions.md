# GitHub Copilot Instructions - ChurchTools IDP Login UI

## Projektübersicht

Dies ist eine React Single Page Application (SPA) für die Benutzerauthentifizierung im Rahmen eines ChurchTools Identity Provider (IDP) Flows. Die Anwendung stellt eine Login-Maske bereit, die mit einem Azure Functions Backend kommuniziert.

### Zweck
- Login-Interface für ChurchTools-Benutzer
- Teil eines OAuth2/OIDC-Authentifizierungs-Flows
- Kommunikation mit ChurchTools IDP Azure Functions Backend

### Technologie-Stack
- **React 18** mit **TypeScript**
- **Vite** als Build-Tool und Dev-Server
- **FluentUI v9** für UI-Komponenten
- **ESLint** für Code-Qualität

## Architektur & Design Patterns

### Projektstruktur

```
src/
├── components/     # React-Komponenten (Presentational & Container)
├── config/        # Anwendungskonfiguration
├── services/      # API-Service-Layer
├── types/         # TypeScript Type-Definitionen
└── utils/         # Hilfsfunktionen
```

### Wichtige Komponenten

1. **LoginLayout** (`src/components/LoginLayout.tsx`)
   - Layout-Container mit optionalem Hintergrundbild
   - Verwendet FluentUI's `makeStyles` für Styling
   - Responsive Design mit Fallback auf Gradient ohne Bild

2. **LoginForm** (`src/components/LoginForm.tsx`)
   - Formular mit Username/Password-Feldern
   - Client-seitige Validierung (Pflichtfelder)
   - Loading-State während API-Call
   - Error-Handling und -Anzeige

3. **ErrorMessage** (`src/components/ErrorMessage.tsx`)
   - Wrapper um FluentUI's `MessageBar`
   - Zeigt Fehlermeldungen an

### Service Layer

**authService.ts** (`src/services/authService.ts`)
- Zentrale Login-Funktion
- POST-Request zu `{loginServerUrl}/api/login`
- Payload: `{ username, password, authentication_request_id }`
- Behandelt HTTP 302 Redirects automatisch
- Error-Handling für verschiedene HTTP-Status-Codes

### Konfiguration

**appConfig.ts** (`src/config/appConfig.ts`)
- Typsicherer Zugriff auf Umgebungsvariablen
- Validierung beim App-Start
- Entfernt trailing slashes von URLs

**Umgebungsvariablen (alle mit `VITE_` Prefix):**
- `VITE_LOGIN_SERVER_URL` - Backend URL (erforderlich)
- `VITE_APP_TITLE` - Seitentitel (erforderlich)
- `VITE_APP_DESCRIPTION` - Beschreibungstext (erforderlich)
- `VITE_BACKGROUND_IMAGE_URL` - Background-Bild URL (optional)

## Code-Konventionen

### TypeScript
- **Strikte Type-Safety**: Alle Komponenten und Funktionen sind typisiert
- **Interfaces über Types**: Bevorzuge `interface` für Objekt-Shapes
- **Explizite Return-Types**: Für alle exportierten Funktionen
- **No `any`**: Verwende `unknown` wenn Type nicht bekannt

### React
- **Functional Components**: Ausschließlich Function Components mit Hooks
- **Props Interface**: Jede Komponente hat ein dediziertes Props-Interface
- **Naming Convention**: PascalCase für Komponenten, camelCase für Funktionen
- **Event Handlers**: Prefix `handle` (z.B. `handleSubmit`)
- **State**: Verwende `useState` für lokalen State, keine Redux/Zustand

### FluentUI v9 Patterns
- **makeStyles**: Für Component-spezifische Styles
- **Tokens**: Verwende FluentUI Tokens statt Hard-coded Werte
  - `tokens.spacingVerticalL`, `tokens.colorBrandBackground`, etc.
- **Theme**: `FluentProvider` in `main.tsx` mit `webLightTheme`
- **Komponenten**: Verwende v9 Komponenten (`Button`, `Input`, `Field`, `Card`, `MessageBar`)

### Styling
- **CSS-in-JS**: FluentUI's `makeStyles` Hook
- **Responsive Design**: Mobile-first approach
- **Minimal Global CSS**: Nur Reset und Body-Styles in `index.css`

### File Organization
- **Eine Komponente pro Datei**
- **Co-location**: Verwandte Dateien nah beieinander
- **Barrel Exports**: Verwende `index.ts` für Modul-Exports (falls benötigt)
- **PascalCase für Komponentendateien**: `LoginForm.tsx`
- **camelCase für Utilities**: `urlUtils.ts`, `authService.ts`

## API-Integration

### Login-Flow

1. **URL-Parameter Extraktion**
   - `authorization_request_id` wird aus Query-String gelesen
   - Bei fehlendem Parameter: Fehlermeldung anzeigen

2. **Login-Request**
   ```typescript
   POST {loginServerUrl}/api/login
   Content-Type: application/json
   
   {
     "username": string,
     "password": string,
     "authentication_request_id": string
   }
   ```

3. **Response-Handling**
   - **Erfolg (302 Redirect)**: Browser folgt automatisch → kein Code nötig
   - **Fehler (4xx/5xx)**: Fehlermeldung aus Response-Body extrahieren und anzeigen
   - **Network Error**: Generische Fehlermeldung

### Error Response Format
```typescript
{
  error?: string,
  message?: string
}
```

## Testing-Strategie

### Manuelle Tests
- **URL-Parameter**: Teste mit und ohne `authorization_request_id`
- **Validierung**: Leere Felder sollten Client-seitige Fehler zeigen
- **API-Mock**: Verwende Browser DevTools Network Tab oder Mock-Server
- **Responsive**: Teste auf verschiedenen Bildschirmgrößen

### Lokale Entwicklung
```bash
# Dev-Server mit Mock-Parameter
http://localhost:5173/?authorization_request_id=test-123
```

## Deployment-Hinweise

### Build-Zeit vs. Runtime
- **Konfiguration erfolgt zur Build-Zeit**
- Umgebungsvariablen werden in den Build eingebettet
- Verschiedene Builds für verschiedene Umgebungen nötig

### Statisches Hosting
- Die App ist eine reine Client-Side SPA
- Kein Server-Side Rendering
- Alle Dateien im `dist/` Ordner können statisch gehostet werden
- Konfiguriere Webserver für SPA-Routing (falls nötig)

### Sicherheit
- **HTTPS**: Immer HTTPS in Production verwenden
- **CORS**: Backend muss CORS für Frontend-Domain konfigurieren
- **No Secrets**: Keine Secrets im Frontend-Code
- **CSP**: Content Security Policy für zusätzliche Sicherheit

## Häufige Aufgaben

### Neue UI-Komponente hinzufügen
1. Erstelle `src/components/ComponentName.tsx`
2. Definiere Props-Interface
3. Verwende FluentUI v9 Komponenten
4. Style mit `makeStyles` und Tokens
5. Exportiere Komponente

### API-Endpoint ändern
1. Aktualisiere `src/services/authService.ts`
2. Aktualisiere TypeScript-Interfaces in `src/types/auth.ts`
3. Passe Error-Handling an falls nötig

### Konfiguration erweitern
1. Füge neue Variable in `.env.example` hinzu
2. Erweitere `AppConfig` Interface in `appConfig.ts`
3. Füge Validierung hinzu
4. Aktualisiere README.md

### Styling anpassen
1. Verwende FluentUI Tokens wo möglich
2. Erstelle `makeStyles` Hook in Komponente
3. Vermeide Inline-Styles außer für dynamische Werte

## Best Practices

### Performance
- Keine unnötigen Re-Renders
- Verwende `useMemo`/`useCallback` nur wenn nötig
- Code-Splitting nicht nötig (Single-Page)

### Accessibility
- FluentUI-Komponenten sind accessibility-ready
- Verwende semantisches HTML
- Teste mit Screen-Reader

### Error Handling
- **Client-seitig**: Validierung vor API-Call
- **Server-seitig**: Zeige Server-Fehlermeldungen direkt an
- **Network**: Catch und zeige user-friendly Messages

### Code-Qualität
- ESLint-Regeln befolgen
- TypeScript strict mode
- Keine `console.log` in Production
- Kommentare nur für komplexe Logik (Code sollte selbsterklärend sein)

## Debugging-Tipps

### Dev-Server startet nicht
- Prüfe `.env` Datei (alle erforderlichen Variablen gesetzt?)
- Prüfe Node-Version (mind. 18)

### Login funktioniert nicht
- Prüfe Network Tab in DevTools
- Validiere Request-Payload
- Prüfe CORS-Einstellungen im Backend
- Prüfe `VITE_LOGIN_SERVER_URL` Konfiguration

### UI sieht falsch aus
- Prüfe ob `FluentProvider` korrekt in `main.tsx` eingebunden ist
- Prüfe Browser-Konsole für FluentUI-Warnungen
- Prüfe `makeStyles` Syntax

## Weiterführende Ressourcen

- [FluentUI v9 Dokumentation](https://react.fluentui.dev/)
- [Vite Dokumentation](https://vitejs.dev/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
