# GitHub Copilot Instructions - ChurchTools IDP Service (Monorepo)

## Projektübersicht

Dieses Monorepo implementiert den ChurchTools Identity Provider (IDP) Service mit:

- **packages/frontend** — React SPA (Login-UI) für den OAuth2/OIDC-Authentifizierungs-Flow
- **packages/backend** — Azure Functions (.NET isolated) IDP-Backend mit RSA-signierten JWTs
- **packages/shared** — Gemeinsame TypeScript-Typen (DTOs)

### Monorepo-Struktur
```
ct-login-idp-service/
├── packages/
│   ├── frontend/   # React 19, TypeScript, Vite, FluentUI v9
│   ├── backend/    # .NET 10, Azure Functions v4, Table Storage
│   └── shared/     # TypeScript-Interfaces
├── infrastructure/ # IaC (Bicep), lokale Entwicklung (Docker)
├── scripts/        # sync-env.mjs
└── .github/        # CI/CD Workflows
```

---

## packages/frontend

### Technologie-Stack
- **React 19** mit **TypeScript**, **Vite**, **FluentUI v9**

### Wichtige Komponenten
- `LoginLayout` — Layout-Container mit optionalem Hintergrundbild
- `LoginForm` — Formular mit Username/Password, Validierung, Loading-State
- `ErrorMessage` — Wrapper um FluentUI `MessageBar`

### Service Layer
- `authService.ts` — POST `{loginServerUrl}/api/login`, behandelt 302 Redirects

### Konfiguration (alle mit `VITE_` Prefix)
- `VITE_LOGIN_SERVER_URL` — Backend URL (erforderlich)
- `VITE_APP_TITLE` — Seitentitel (erforderlich)
- `VITE_APP_DESCRIPTION` — Beschreibungstext (erforderlich)
- `VITE_BACKGROUND_IMAGE_URL` — Background-Bild URL (optional)

### Code-Konventionen (Frontend)
- Functional Components mit Hooks, kein Redux/Zustand
- `makeStyles` + FluentUI Tokens für Styling
- Props-Interface für jede Komponente
- Prefix `handle` für Event-Handler
- Keine `any`, kein `console.log` in Production

---

## packages/backend

### Technologie-Stack
- **.NET 10 isolated**, **Azure Functions v4**, **Azure Table Storage**

### Architektur-Guardrails
| Schicht | Verantwortung |
|---|---|
| `Functions/*` | HTTP-Einstiegspunkt, Request-Validierung, Service-Orchestrierung |
| `Services/*` | ChurchTools-API, JWT/JWK-Logik, Token-Persistenz |
| `Models/*` | DTOs, Storage-Entities |

Business-Logik gehört **nicht** in Function-Klassen.

### Öffentliche Endpoints
- `POST /api/authenticate`
- `POST /api/refresh`
- `GET/POST /api/jwks.json`
- OIDC-Endpoints unter `Functions/Oidc/`

### Token & Claims
Claims: `firstname`, `lastname`, `email`, `st_ref`, `scopes`  
Scopes-Konvention: `ct_group_<domainIdentifier>`

### Sicherheitsregeln (Backend)
- Keine Credentials loggen
- Keine rohen ChurchTools-Cookies loggen
- Keine vollständigen Access/Refresh-Tokens loggen
- Refresh-Tokens sind One-Time-Use

### Fehler-Semantik
- `400` — fehlerhafter Payload / fehlende Felder
- `401` — Authentifizierungs-/Autorisierungsfehler
- `502` — Upstream-Abhängigkeitsfehler

---

## packages/shared

Enthält TypeScript-Interfaces, die zwischen Frontend und Backend geteilt werden:
- `LoginRequest`, `ErrorResponse`, `LoginResult`

Import im Frontend: `import type { LoginRequest } from '@ct-login-idp-service/shared'`

---

## Sprach-Konventionen (Backend)

| Kontext | Sprache |
|---|---|
| Code, Variablen, Klassen | Englisch |
| Code-Kommentare | Deutsch |
| Fehlermeldungen (HTTP-Responses) | Deutsch |
| Log-Einträge | Englisch |

---

## Lokale Entwicklung

```bash
cp .env.example .env.local
# .env.local konfigurieren

npm install
npm run build:shared
npm run dev:frontend   # http://localhost:5173
npm run dev:backend    # http://localhost:7050
```

### `npm run sync:env`
Liest `.env.local` im Root und schreibt:
- `VITE_*` Variablen → `packages/frontend/.env.local`
- Alle anderen → `packages/backend/local.settings.json`

---

## Häufige Aufgaben

### Neue Frontend-Komponente
1. `packages/frontend/src/components/ComponentName.tsx`
2. Props-Interface definieren
3. FluentUI v9 + `makeStyles`

### Neuen Backend-Endpoint
1. `packages/backend/Functions/FunctionName.cs`
2. Service-Logik in `packages/backend/Services/`
3. DTO in `packages/backend/Models/`

### Shared-Type hinzufügen
1. `packages/shared/src/types/` erweitern
2. Export in `packages/shared/src/index.ts` ergänzen
3. `npm run build:shared`
4. Im Frontend importieren, im Backend C# DTO synchronisieren

### Konfiguration erweitern
1. Variable in `.env.example` ergänzen
2. Bei Backend: `local.settings.json` Schema anpassen
3. Bei Frontend: `appConfig.ts` erweitern

---

## Sicherheit
- HTTPS in Production
- CORS korrekt konfiguriert (Backend nur für Frontend-Domain)
- Keine Secrets im Frontend-Code
- CSP für zusätzliche Sicherheit
