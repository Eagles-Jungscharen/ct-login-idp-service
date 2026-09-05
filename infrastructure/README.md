# Infrastructure

Dieses Verzeichnis enthält alle Infrastructure-as-Code (IaC) und Deployment-Ressourcen.

## Verzeichnisstruktur

```
infrastructure/
├── local/          # Lokale Entwicklungsumgebung (Docker Compose + Azurite)
├── azure/          # Azure Bicep-Templates
└── README.md
```

## Lokale Entwicklung

Azurite (Azure Storage Emulator) wird für die lokale Entwicklung benötigt.
Docker Compose Konfiguration folgt in `local/`.

## Azure Deployment

Bicep-Templates für das Azure-Deployment folgen in `azure/`.
