# Téléchargements ORION

Les `.exe` (~100 Mo) **ne sont pas versionnés dans git**. Ils sont publiés via GitHub Releases :

- Core : https://github.com/oriononevision/orion-core-desktop/releases
- Transfer : https://github.com/oriononevision/orion-transfer-desktop/releases

## Rebuild local + copie site (dev)

```bash
cd ../../logiciel-desktop
npm run dist
npm run publish:web

cd ../logiciel-transfer
npm run dist
npm run publish:web
```

## Publier une release

```bash
gh release create v0.1.0 release/ORION-Core-Setup-0.1.0.exe -R oriononevision/orion-core-desktop --title "ORION Core 0.1.0" --notes "Installateur Windows"
gh release create v0.1.0 release/ORION-Transfer-Setup-0.1.0.exe -R oriononevision/orion-transfer-desktop --title "ORION Transfer 0.1.0" --notes "Installateur Windows"
```

Le site pointe vers ces URLs (`src/lib/downloads.ts`). Sur Mac : `npm run dist:mac` depuis un Mac (ou CI macOS).
