# ChurchTools IDP Login UI

React Single Page Application (SPA) mit einer Login-Maske zur Authentifizierung via dem ChurchTools IDP Azure Functions Backend.

## 📋 Beschreibung

Diese Anwendung stellt eine benutzerfreundliche Login-Oberfläche bereit, die es Benutzern ermöglicht, sich mit ihren ChurchTools-Zugangsdaten anzumelden. Die App wird im Rahmen eines OAuth2/OIDC-Flows aufgerufen und kommuniziert mit einem Backend-Server, um die Authentifizierung durchzuführen.

## 🚀 Technologie-Stack

- **React 18** - UI Library
- **TypeScript** - Type-safe development
- **Vite** - Build Tool und Dev Server
- **FluentUI v9** - Microsoft's moderne React UI-Komponentenbibliothek
- **ESLint** - Code Linting

## ✨ Features

- 🎨 Moderne, responsive UI mit FluentUI v9 Komponenten
- 🔐 Sichere Login-Funktionalität mit Client-seitiger Validierung
- 🖼️ Optionales, konfigurierbares Hintergrundbild
- 🌐 Build-Zeit-Konfiguration über Umgebungsvariablen
- 📱 Responsives Design für Desktop und Mobile
- ⚡ Schnelle Performance durch Vite

## 📦 Installation

### Voraussetzungen

- Node.js (Version 18 oder höher)
- npm (Version 9 oder höher)

### Setup

1. Repository klonen:
   ```bash
   git clone <repository-url>
   cd churchtool-idp-loginui
   ```

2. Dependencies installieren:
   ```bash
   npm install
   ```

3. Umgebungsvariablen konfigurieren:
   ```bash
   cp .env.example .env
   ```

4. `.env` Datei anpassen (siehe [Konfiguration](#konfiguration))

## ⚙️ Konfiguration

Die Anwendung wird über Umgebungsvariablen konfiguriert. Erstellen Sie eine `.env` Datei im Projektstamm:

```env
# URL des Login-Servers (ohne trailing slash)
VITE_LOGIN_SERVER_URL=https://your-churchtools-idp-server.com

# Titel der Login-Maske
VITE_APP_TITLE=ChurchTools Login

# Beschreibung unter dem Titel
VITE_APP_DESCRIPTION=Melden Sie sich mit Ihren ChurchTools-Zugangsdaten an

# URL zum Hintergrundbild (optional, kann leer sein)
VITE_BACKGROUND_IMAGE_URL=https://example.com/background.jpg
```

### Konfigurationsparameter

| Variable | Pflicht | Beschreibung |
|----------|---------|--------------|
| `VITE_LOGIN_SERVER_URL` | Ja | URL des Backend-Servers (ohne trailing slash) |
| `VITE_APP_TITLE` | Ja | Titel, der auf der Login-Seite angezeigt wird |
| `VITE_APP_DESCRIPTION` | Ja | Beschreibung unter dem Titel |
| `VITE_BACKGROUND_IMAGE_URL` | Nein | URL zu einem Hintergrundbild. Falls nicht gesetzt, wird ein Gradient angezeigt |

## 🛠️ Entwicklung

### Dev Server starten

```bash
npm run dev
```

Die Anwendung ist dann unter `http://localhost:5173` verfügbar.

### Testen mit URL-Parameter

Die Anwendung erwartet einen `authorization_request_id` Parameter in der URL:

```
http://localhost:5173/?authorization_request_id=test-request-id-123
```

## 🏗️ Build

### Production Build erstellen

```bash
npm run build
```

Der Build wird im `dist/` Ordner erstellt.

### Build Preview

```bash
npm run preview
```

Startet einen lokalen Server mit dem Production Build.

## 📚 API-Integration

### Login-Endpoint

Die Anwendung sendet einen POST-Request an:

```
{VITE_LOGIN_SERVER_URL}/api/login
```

**Request Payload:**
```json
{
  "username": "<churchtools-user>",
  "password": "<churchtools-password>",
  "authentication_request_id": "<authorization-request-id>"
}
```

**Erfolgsfall:**
- Der Server sendet einen HTTP 302 Redirect
- Der Browser wird automatisch zur Ziel-URL weitergeleitet

**Fehlerfall:**
- Der Server sendet einen HTTP-Fehlercode (z.B. 401, 403, 500)
- Die Fehlermeldung aus dem Response-Payload wird angezeigt

**Error Response Beispiel:**
```json
{
  "error": "Ungültige Anmeldedaten",
  "message": "Benutzername oder Passwort ist falsch"
}
```

## 📁 Projektstruktur

```
churchtool-idp-loginui/
├── src/
│   ├── components/        # React-Komponenten
│   │   ├── ErrorMessage.tsx
│   │   ├── LoginForm.tsx
│   │   └── LoginLayout.tsx
│   ├── config/           # Konfiguration
│   │   └── appConfig.ts
│   ├── services/         # API Services
│   │   └── authService.ts
│   ├── types/            # TypeScript-Definitionen
│   │   └── auth.ts
│   ├── utils/            # Hilfsfunktionen
│   │   └── urlUtils.ts
│   ├── App.tsx           # Haupt-App-Komponente
│   ├── main.tsx          # App Entry Point
│   └── index.css         # Globale Styles
├── public/               # Statische Assets
├── .env                  # Lokale Umgebungsvariablen (nicht in Git)
├── .env.example          # Template für Umgebungsvariablen
├── index.html            # HTML Template
├── package.json          # Dependencies und Scripts
├── tsconfig.json         # TypeScript-Konfiguration
└── vite.config.ts        # Vite-Konfiguration
```

## 🔒 Sicherheit

- Passwörter werden nie im Frontend gespeichert
- Alle API-Requests erfolgen über HTTPS (in Production)
- Client-seitige Validierung verhindert leere Eingaben
- TypeScript sorgt für Type-Safety

## 🚢 Deployment

### Statisches Hosting

Nach dem Build kann der `dist/` Ordner auf jedem statischen Webhosting bereitgestellt werden:

- Azure Static Web Apps
- Netlify
- Vercel
- AWS S3 + CloudFront
- GitHub Pages

### Umgebungsspezifische Builds

Für verschiedene Umgebungen (dev, staging, production) können unterschiedliche `.env` Dateien verwendet werden:

```bash
# Development
npm run dev

# Production Build mit .env.production
npm run build -- --mode production

# Staging Build mit .env.staging
npm run build -- --mode staging
```

## 📝 License

Siehe [LICENSE](LICENSE) Datei für Details.

## 🤝 Contributing

Beiträge sind willkommen! Bitte erstellen Sie einen Pull Request oder öffnen Sie ein Issue.

## 📧 Support

Bei Fragen oder Problemen wenden Sie sich bitte an das Entwicklungsteam.
