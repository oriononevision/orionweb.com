# Téléchargements ORION

Placez ici `ORION-Core-Setup-0.1.0.exe` après :

```bash
cd ../../logiciel-desktop
npm run dist
npm run publish:web
```

Les `.exe` sont ignorés par git (fichier trop volumineux). En production, hébergez l’installateur (R2 / GitHub Releases) et définissez `VITE_CORE_DESKTOP_URL`.
